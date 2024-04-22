<template>
  <b-col cols="12" class="mt-5 mb-5">
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
            <b-button @click="atualizarEndereco(item)">Modificar</b-button>
          </span>
        </template>
      </b-table>
    </b-row>
  </b-col>
  <b-modal
    id="modal-endereco"
    size="lg"
    v-model="modalAberto"
    title="Endereço"
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
  public endereco: any = {
    id_endereco: 0,
    nm_estado: "",
    nm_cidade: "",
    nm_cep: "",
    nm_bairro: "",
    nm_rua: "",
    nm_complemento: "",
    nu_casa: 0,
  };

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
            nu_casa: 0,
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
    this.modalAberto = true;
    this.endereco = item;
    console.log(item);
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
