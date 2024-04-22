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
        <template v-slot:cell(acoes)="{ item }">
          <span>
            <b-button @click="atualizarEndereco(item)">Modificar</b-button>
          </span>
        </template>
      </b-table>
    </b-row>
  </b-col>
  <b-modal id="modal-endereco" size="lg" v-model="modalAberto" title="Endereço">
    <template #default="{}">
      <b-container fluid>
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
        </b-row>
      </b-container>
    </template>
    <template #modal-footer="{}"></template>
  </b-modal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserModule from "@/store/modules/UserModule";
import { getModule } from "vuex-module-decorators";
import UserService from "../services/UserService";
import store from "@/store";
import User from "@/types/User";

@Options({
  props: {
    msg: String,
  },
})
export default class Enderecos extends Vue {
  private userModule: UserModule = getModule(UserModule, store);
  public dados: Array<any> = [];
  public fields: Array<any> = [
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
    nm_estado: "",
    nm_cidade: "",
    nm_bairro: "",
    nm_rua: "",
    nm_complemento: "",
    nu_casa: 0,
  };

  get user(): User | null {
    return this.userModule.user;
  }

  async mounted(): Promise<void> {
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
