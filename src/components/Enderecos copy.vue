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
          <span>{{ item.qt_material }} d {{ item.sg_medida }}</span>
        </template>
      </b-table>
    </b-row>
  </b-col>
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
