<template>
  <b-col cols="12" class="mt-4" v-if="msg">
    <div role="alert" aria-live="polite" aria-atomic="true" :class="variant">
      <div v-html="msg"></div>
    </div>
  </b-col>
  <b-col cols="7" class="mt-5">
    <b-row>
      <b-col cols="6" v-bind:key="dado" v-for="dado in dados">
        <b-card
          tag="produto"
          class="produto mb-2 card-eco"
          :img-src="dado.nm_imagem"
          img-height="200"
          img-top
        >
          <h2 class="text-truncate">{{ dado.nm_produto }}</h2>
          <span class="ds_produto">{{ dado.ds_produto }}</span>
          <h3 class="valores text-truncate mt-3 mb-4">
            <span class="eco">{{ formatarNumero(dado.vl_eco) }} ECO</span>
            <span class="brl">{{ formatarNumero(dado.vl_brl) }} R$</span>
          </h3>
          <b-button-group style="width: 100%">
            <template v-if="dado.qt_produto > 0">
              <b-button
                variant="outline-success"
                @click="adicionarCarrinho(dado)"
                >Adicionar ao Carrinho</b-button
              >
            </template>
            <template v-else>
              <b-button variant="danger" disabled="true"
                >Fora de Estoque</b-button
              >
            </template>
          </b-button-group>
        </b-card>
      </b-col>
    </b-row>
  </b-col>
  <b-col cols="5" class="mt-5">
    <b-row>
      <b-col cols="12">
        <b-list-group>
          <b-list-group-item>
            <h2 class="carrinho-titulo mb-2 mt-2">Carrinho:</h2>
          </b-list-group-item>
          <b-list-group-item v-bind:key="dado" v-for="dado in carrinho">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ dado.nm_produto }}</h5>
              <small>{{ formatarNumero(dado.vl_eco) }} ECOs</small>
            </div>

            <p class="mb-1">
              {{ dado.ds_produto }}
            </p>
            <div class="d-flex w-100 justify-content-between">
              <div style="display: grid">
                <b-button
                  variant="outline-danger"
                  size="sm"
                  @click="removerCarrinho(dado)"
                  >Remover</b-button
                >
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div style="display: grid">
              <b-button size="lg" variant="outline-success" @click="comprar"
                >Comprar</b-button
              >
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-col>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserModule from "@/store/modules/UserModule";
import { getModule } from "vuex-module-decorators";
import store from "@/store";
import User from "@/types/User";
import UserService from "../services/UserService";

@Options({
  components: {},
  props: {
    msg: String,
  },
})
export default class Produtos extends Vue {
  private userModule: UserModule = getModule(UserModule, store);
  public msg: string | null = null;
  public variant: string | null = null;
  public dados: Array<any> = [];
  public carrinho: Array<any> = [];

  get user(): User | null {
    return this.userModule.user;
  }

  get solicitacoes(): Array<any> {
    return this.dados;
  }

  adicionarCarrinho(item: any) {
    this.carrinho.push(item);
  }

  async comprar() {
    const chave = this.$cookies.get("chave");
    if (!chave) return;
    if (this.carrinho.length === 0) {
      return;
    }
    let idProdutos: Array<any> = [];
    for (let i = 0; i < this.carrinho.length; i = i + 1) {
      const produto = this.carrinho[i];
      idProdutos.push(produto.id_produto);
    }
    await UserService.comprarProdutos(chave, idProdutos).then((data: any) => {
      if (data.codigo === "debitado") {
        this.userModule.setQtEcoSaldo(data.saldo);
        this.msg = `Foi debitado <b>${data.debitado}</b> da sua conta, seu novo saldo é <b>${data.saldo}</b>`;
        this.variant = "alert alert-success";
      } else if (data.codigo === "produto_sem_estoque") {
        this.msg = `<b>${data.nm_produto}</b> está fora de estoque`;
        this.variant = "alert alert-info";
      } else if (data.codigo === "saldo_insuficiente") {
        this.msg = `Saldo insuficiente para comprar <b>${data.nm_produto}</b>`;
        this.variant = "alert alert-warning";
      }
      this.carregarProdutos();
    });
  }

  public removerCarrinho(item: any) {
    const index = this.carrinho.indexOf(item);
    if (index !== -1) {
      this.carrinho.splice(index, 1);
    }
  }

  formatarNumero(valor: number, minimumFractionDigits: number = 0): string {
    const valorCentavos = Math.round(valor * 100);
    return (valorCentavos / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: minimumFractionDigits,
    });
  }

  async carregarProdutos(): Promise<void> {
    const chave = this.$cookies.get("chave");
    if (!chave) return;
    await UserService.produtos(chave).then((data: any) => {
      this.dados = data.lista;
    });
  }

  async created(): Promise<void> {
    this.carregarProdutos();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.valores {
  display: inline-grid;
}
.valores .brl {
  color: #10ad40;
  font-size: 12pt;
}
.valores .eco {
  color: #42d16d;
  font-size: 18pt;
}
.ds_produto {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.carrinho-titulo {
  text-align: left;
}
</style>
