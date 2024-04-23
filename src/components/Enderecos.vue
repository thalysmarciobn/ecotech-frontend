<template>
  <b-col cols="12" class="mt-4" v-if="msg">
    <div
      class="mb-0"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      :class="variant"
    >
      <div v-html="msg"></div>
    </div>
  </b-col>
  <b-col cols="12" class="mt-4 text-right">
    <div>
      <b-button
        size="lg"
        variant="outline-success"
        @click="abrirModalAdicionarEndereco()"
        >Adicionar Endereço</b-button
      >
    </div>
  </b-col>
  <b-col cols="12">
    <b-row>
      <b-table
        style="max-height: 400px; overflow-y: auto"
        class="table-eco mt-4"
        hover
        ref="table"
        :items="dados"
        :fields="fields"
      >
        <template v-slot:cell(nm_cep)="{ item }">
          <span>{{ cep(item.nm_cep) }}</span>
        </template>
        <template v-slot:cell(acoes)="{ item }">
          <span>
            <b-button-group size="sm">
              <b-button
                variant="outline-primary"
                @click="atualizarEndereco(item)"
                >Editar</b-button
              >
              <b-button variant="outline-danger" @click="removerEndereco(item)"
                >Remover</b-button
              >
            </b-button-group>
          </span>
        </template>
      </b-table>
    </b-row>
  </b-col>
  <b-modal
    id="modal-endereco"
    size="lg"
    v-model="modalAberto"
    title="Editar Endereço"
    hide-footer
  >
    <template #default="{}">
      <b-container fluid>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-cep">CEP:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-cep"
              type="text"
              @input="pesquisar"
              debounce="500"
              v-model="endereco.nm_cep"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_estado">Estado:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_estado"
              type="text"
              v-model="endereco.nm_estado"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_cidade">Cidade:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_cidade"
              type="text"
              v-model="endereco.nm_cidade"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_bairro">Bairro:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_bairro"
              type="text"
              v-model="endereco.nm_bairro"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_rua">Rua:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_rua"
              type="text"
              v-model="endereco.nm_rua"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_complemento">Complemento:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_complemento"
              type="text"
              v-model="endereco.nm_complemento"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nu_casa">Nº Casa:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nu_casa"
              type="number"
              min="1"
              v-model="endereco.nu_casa"
            ></b-form-input>
          </b-col>
          <b-button-group class="mt-5" style="width: 100%">
            <b-button @click="salvarEndereco()" variant="outline-success"
              >Salvar</b-button
            >
          </b-button-group>
        </b-row>
      </b-container>
    </template>
  </b-modal>
  <b-modal
    id="modal-endereco"
    size="lg"
    v-model="modalAdicionarAberto"
    title="Adicionar Endereço"
    hide-footer
  >
    <template #default="{}">
      <b-container fluid>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-cep">CEP:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-cep"
              type="text"
              @input="pesquisar"
              debounce="500"
              v-model="endereco.nm_cep"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_estado">Estado:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_estado"
              type="text"
              v-model="endereco.nm_estado"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_cidade">Cidade:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_cidade"
              type="text"
              v-model="endereco.nm_cidade"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_bairro">Bairro:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_bairro"
              type="text"
              v-model="endereco.nm_bairro"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_rua">Rua:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_rua"
              type="text"
              v-model="endereco.nm_rua"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nm_complemento">Complemento:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nm_complemento"
              type="text"
              v-model="endereco.nm_complemento"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-3">
          <b-col sm="3">
            <label for="type-nu_casa">Nº Casa:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="type-nu_casa"
              type="number"
              min="1"
              v-model="endereco.nu_casa"
            ></b-form-input>
          </b-col>
          <b-button-group class="mt-5" style="width: 100%">
            <b-button @click="adicionarEndereco()" variant="outline-success"
              >Adicionar</b-button
            >
          </b-button-group>
        </b-row>
      </b-container>
    </template>
  </b-modal>
  <b-modal
    id="modal-endereco"
    size="md"
    v-model="modalRemoverAberto"
    hide-header
    hide-footer
  >
    <h2 class="text-break text-center mt-3 mb-5">Você deseja remover?</h2>
    <div>
      <table style="width: 100%">
        <tr>
          <th>CEP:</th>
          <td style="text-align: right">{{ endereco.nm_cep }}</td>
        </tr>
        <tr>
          <th>Estado:</th>
          <td style="text-align: right">{{ endereco.nm_estado }}</td>
        </tr>
        <tr>
          <th>Cidade:</th>
          <td style="text-align: right">{{ endereco.nm_cidade }}</td>
        </tr>
        <tr>
          <th>Bairro:</th>
          <td style="text-align: right">{{ endereco.nm_bairro }}</td>
        </tr>
        <tr>
          <th>Rua:</th>
          <td style="text-align: right">{{ endereco.nm_rua }}</td>
        </tr>
        <tr>
          <th>Complemento:</th>
          <td style="text-align: right">{{ endereco.nm_complemento }}</td>
        </tr>
        <tr>
          <th>Nº Casa:</th>
          <td style="text-align: right">{{ endereco.nu_casa }}</td>
        </tr>
      </table>
    </div>
    <b-button-group style="width: 100%" class="mt-4">
      <b-button
        @click="enviarRemoverEndereco(endereco)"
        variant="outline-danger"
        >Remover</b-button
      >
      <b-button @click="fecharModalRemoverEndereco()" variant="outline-primary"
        >Cancelar</b-button
      >
    </b-button-group>
  </b-modal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserModule from "@/store/modules/UserModule";
import { getModule } from "vuex-module-decorators";
import UserService from "../services/UserService";
import store from "@/store";
import User from "@/types/User";
import ViacepService from "@/services/ViacepService";
import ViacepResultado from "@/types/ViacepResultado";

@Options({
  props: {
    msg: String,
  },
})
export default class Enderecos extends Vue {
  private userModule: UserModule = getModule(UserModule, store);
  public dados: Array<any> = [];
  public fields: Array<any> = [
    { key: "nm_cep", label: "CEP" },
    { key: "nm_estado", label: "Estado" },
    { key: "nm_cidade", label: "Cidade" },
    { key: "nm_bairro", label: "Bairro" },
    { key: "nm_rua", label: "Rua" },
    { key: "nm_complemento", label: "Complemento" },
    { key: "nu_casa", label: "Nº Casa" },
    { key: "acoes", label: "" },
  ];
  public modalAberto: boolean = false;
  public modalRemoverAberto: boolean = false;
  public modalAdicionarAberto: boolean = false;
  public endereco: any = {
    id_endereco: 0,
    nm_estado: "",
    nm_cidade: "",
    nm_cep: "",
    nm_bairro: "",
    nm_rua: "",
    nm_complemento: "",
    nu_casa: 1,
  };
  public msg: string | null = null;
  public variant: string | null = null;

  private timeout: any = null;
  private pesquisando: boolean = false;

  get user(): User | null {
    return this.userModule.user;
  }

  pesquisar() {
    if (this.pesquisando) {
      return;
    }
    this.pesquisando = true;
    this.timeout = setTimeout(async () => {
      ViacepService.checar(this.endereco.nm_cep)
        .then((data: ViacepResultado) => {
          const id_endereco = this.endereco.id_endereco;
          const nm_cep = this.endereco.nm_cep;
          this.endereco = {
            id_endereco: id_endereco,
            nm_estado: data.uf,
            nm_cidade: data.localidade,
            nm_cep: nm_cep,
            nm_bairro: data.bairro,
            nm_rua: data.logradouro,
            nm_complemento: data.complemento,
            nu_casa: 1,
          };
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          this.pesquisando = false;
        });
    }, 500);
  }

  abrirModalAdicionarEndereco() {
    this.endereco = {
      id_endereco: 0,
      nm_estado: "",
      nm_cidade: "",
      nm_cep: "",
      nm_bairro: "",
      nm_rua: "",
      nm_complemento: "",
      nu_casa: 1,
    };
    this.modalAdicionarAberto = true;
  }

  async adicionarEndereco(): Promise<void> {
    const chave = this.$cookies.get("chave");
    if (!chave) {
      return;
    }
    const id_endereco = this.endereco.id_endereco;
    const nm_estado = this.endereco.nm_estado;
    const nm_cidade = this.endereco.nm_cidade;
    const nm_cep = this.endereco.nm_cep;
    const nm_bairro = this.endereco.nm_bairro;
    const nm_rua = this.endereco.nm_rua;
    const nm_complemento = this.endereco.nm_complemento;
    const nu_casa = this.endereco.nu_casa;
    await UserService.adicionarEndereco(
      chave,
      id_endereco,
      nm_estado,
      nm_cidade,
      nm_cep,
      nm_bairro,
      nm_rua,
      nm_complemento,
      nu_casa
    ).then((data: any) => {
      if (data.codigo === "inserido") {
        this.msg = `O endereço <b>${nm_rua}, ${nm_bairro}, ${nm_cidade}</b> foi adicionado`;
        this.variant = "alert alert-success";
        this.modalAdicionarAberto = false;
        this.carregar();
      }
    });
  }

  salvarEndereco(): void {
    const chave = this.$cookies.get("chave");
    if (!chave) {
      return;
    }
    const id_endereco = this.endereco.id_endereco;
    const nm_estado = this.endereco.nm_estado;
    const nm_cidade = this.endereco.nm_cidade;
    const nm_cep = this.endereco.nm_cep;
    const nm_bairro = this.endereco.nm_bairro;
    const nm_rua = this.endereco.nm_rua;
    const nm_complemento = this.endereco.nm_complemento;
    const nu_casa = this.endereco.nu_casa;
    UserService.editarEndereco(
      chave,
      id_endereco,
      nm_estado,
      nm_cidade,
      nm_cep,
      nm_bairro,
      nm_rua,
      nm_complemento,
      nu_casa
    )
      .then((data) => {
        if (data.codigo === "atualizado") {
          this.modalAberto = false;
          this.carregar();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cep(value: any): string {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value;
  }

  async mounted(): Promise<void> {
    await this.carregar();
  }

  async carregar(): Promise<void> {
    const chave = this.$cookies.get("chave");
    if (!chave) {
      return;
    }
    await UserService.enderecos(chave).then((data: any) => {
      console.log(data);
      if (data.codigo == "enviado") {
        this.dados = data.enderecos;
      }
    });
  }

  atualizarEndereco(item: any) {
    const novoItem = Object.assign({}, item);
    this.endereco = novoItem;
    this.modalAberto = true;
  }

  removerEndereco(item: any) {
    const novoItem = Object.assign({}, item);
    this.endereco = novoItem;
    this.modalRemoverAberto = true;
  }

  async enviarRemoverEndereco(item: any) {
    const chave = this.$cookies.get("chave");
    if (!chave) {
      return;
    }
    await UserService.removerEndereco(chave, item.id_endereco).then(
      async (data: any) => {
        if (data.codigo == "atualizado") {
          this.modalRemoverAberto = false;
          this.msg = `O endereço <b>${item.nm_rua}, ${item.nm_bairro}, ${item.nm_cidade}</b> foi removido`;
          this.variant = "alert alert-success";
          await this.carregar();
        }
      }
    );
  }

  fecharModalRemoverEndereco(): void {
    this.modalRemoverAberto = false;
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
