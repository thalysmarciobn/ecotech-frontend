<template>
  <b-col cols="12" v-if="msg">
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      class="alert alert-info"
    >
      <div v-html="msg"></div>
    </div>
  </b-col>
  <b-col cols="7">
    <div v-bind:key="dado" v-for="dado in dados">
      <div>
        {{ dado }}
        <b-button variant="success" @click="adicionarCarrinho(dado)"
          >Adicionar</b-button
        >
      </div>
    </div>
  </b-col>
  <b-col cols="5">
    <b-row>
      <b-col cols="12">
        <h1>Carrinho:</h1>
        <template v-bind:key="dado" v-for="dado in carrinho">
          {{ dado }}
          <b-button variant="warning" @click="removerCarrinho(dado)"
            >Remover</b-button
          >
        </template>
      </b-col>
      <b-col cols="12">
        <b-button variant="warning" @click="comprar">Comprar</b-button>
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
      } else if (data.codigo === "produto_sem_estoque") {
        this.msg = `<b>${data.nm_produto}</b> está fora de estoque`;
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
</style>
