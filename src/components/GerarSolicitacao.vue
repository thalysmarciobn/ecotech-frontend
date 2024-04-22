<template>
  <b-col cols="12" class="mt-5 mb-5 solicitacao">
    <b-row>
      <b-col cols="12">
        <div
          v-if="msg != ''"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          class="alert alert-info"
        >
          {{ msg }}
        </div>
      </b-col>
      <b-col md="6" order-sm="0" order-md="0">
        <b-form-group
          label="Resíduo:"
          label-for="residuo"
          label-cols-md="4"
          label-align="left"
        >
          <select
            @change="residuoClicado($event.target.value)"
            id="residuo"
            name="residuo"
            class="form-select"
          >
            <option>Selecione um Resíduo</option>
            <option
              v-bind:key="residuo.id_residuo"
              v-for="residuo in listaResiduos"
              :value="residuo.id_residuo"
            >
              {{ residuo.nm_residuo }}
            </option>
          </select>
        </b-form-group>
        <b-form-group
          label="Material:"
          label-for="material"
          label-cols-md="4"
          label-align="left"
        >
          <select
            @change="materialClicado($event.target.value)"
            id="material"
            name="material"
            class="form-select"
          >
            <option>Selecione um Material</option>
            <option
              v-bind:key="material.id_residuo"
              v-for="material in listaMateriais"
              :value="material.nm_material"
            >
              {{ material.nm_material }}
            </option>
          </select>
        </b-form-group>
        <b-form-group
          :label="`Peso ${sg_medida}`"
          label-for="qt_material"
          label-cols-md="4"
          label-align="left"
        >
          <b-form-input
            name="qt_material"
            id="qt_material"
            type="number"
            min="0.01"
            step="0.01"
            v-model="qt_material"
            required
          ></b-form-input>
        </b-form-group>
        <form @submit.prevent="adicionarSolicitacao">
          <div style="display: grid">
            <b-button variant="primary" type="submit"
              >Adicionar Material</b-button
            >
          </div>
        </form>
      </b-col>
      <b-col md="6" order-sm="2" order-md="2">
        <div class="table-responsive">
          <b-table
            style="max-height: 400px; overflow-y: auto"
            hover
            :fields="fields"
            :items="solicitacaos"
          >
            <template v-slot:cell(acao)="{ item }">
              <span
                ><b-button variant="danger" @click="remover(item)"
                  >Remover</b-button
                ></span
              >
            </template>
            <template v-slot:cell(qt_material)="{ item }">
              <span>{{ item.qt_material }} {{ item.sg_medida }}</span>
            </template>
          </b-table>
        </div>
      </b-col>
      <b-col md="6" order-sm="1" order-md="2"> </b-col>
      <b-col md="6" order-sm="3" order-md="3">
        <form @submit.prevent="enviarSolicitacao">
          <div style="display: grid">
            <b-button variant="success" type="submit"
              >Enviar Solicitação</b-button
            >
          </div>
        </form>
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
import PainelHeader from "./Painel/PainelHeader.vue";

@Options({
  components: {
    PainelHeader,
  },
  props: {
    msg: String,
  },
})
export default class GerarSolicitacao extends Vue {
  private userModule: UserModule = getModule(UserModule, store);
  public residuos: Array<any> = [];
  private id_residuo: number = 0;
  public materiais: Array<any> = [];
  private nm_material: string = "";
  public qt_material: number = 0.01;
  public solicitacaos: Array<any> = [];
  private sg_medida: string = "";
  public fields: Array<any> = [
    { key: "nm_material", label: "Material" },
    { key: "qt_material", label: "Quantidade" },
    { key: "acao", label: "" },
  ];
  public msg: string = "";
  public variant: string = "";

  get user(): User | null {
    return this.userModule.user;
  }

  get listaResiduos(): Array<any> {
    return this.residuos;
  }

  get listaMateriais(): Array<any> {
    return this.materiais;
  }

  public async residuoClicado(id: number): Promise<void> {
    const chave = this.$cookies.get("chave");
    if (!chave) {
      return;
    }
    try {
      await UserService.materiais(chave, id).then((data: any) => {
        this.materiais = data;
        this.id_residuo = id;
      });
    } catch (error) {
      console.log(error);
    }
  }

  public remover(item: any) {
    const index = this.solicitacaos.indexOf(item);
    if (index !== -1) {
      this.solicitacaos.splice(index, 1);
    }
  }

  public materialClicado(id: string) {
    this.nm_material = id;
    this.sg_medida = "";
    this.materiais.forEach((value) => {
      if (value.nm_material === id) {
        this.sg_medida = value.sg_medida;
      }
    });
  }

  async created(): Promise<void> {
    const chave = this.$cookies.get("chave");
    if (!chave) {
      return;
    }
    try {
      await UserService.residuos(chave).then((data: any) => {
        this.residuos = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  adicionarSolicitacao() {
    if (
      this.id_residuo === 0 ||
      this.nm_material === "" ||
      this.nm_material === "Selecione um Material"
    ) {
      this.msg = "Você deve selecionar um material.";
      this.variant = "alert alert-info";
      return;
    }

    const materialExistente = this.materiais.find(
      (material) => material.nm_material === this.nm_material
    );
    if (!materialExistente) {
      this.msg = "Material não encontrado na lista de materiais.";
      this.variant = "alert alert-warning";
      return;
    }

    if (this.qt_material.toString() == "0") {
      this.msg = "O peso do material não pode ser <b>0</b>.";
      this.variant = "alert alert-warning";
      return;
    }

    let solicitacao = {
      id_residuo: this.id_residuo,
      nm_material: this.nm_material,
      qt_material: this.qt_material,
      sg_medida: this.sg_medida,
    };
    this.solicitacaos.push(solicitacao);

    this.msg = "";
    this.variant = "";
  }

  enviarSolicitacao() {
    const chave = this.$cookies.get("chave");
    if (!chave) {
      return;
    }
    if (this.solicitacaos.length === 0) {
      this.msg = "Você deve inserir algum material para uma solicitação.";
      this.variant = "alert alert-warning";
      return;
    }
    UserService.enviarSolicitacao(chave, this.solicitacaos).then(
      (data: any) => {
        console.log(data);
        if (data.codigo === "inserido") {
          this.msg = "Solicitação enviada com sucesso!";
          this.variant = "alert alert-success";
        }
      }
    );
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

.solicitacao {
  background-color: #fff;
  padding-top: 15pt;
  padding-bottom: 15pt;
  box-shadow: 0px 0px 20px 0px #eee;
  border: 1px solid #e9e9e9 !important;
  border-radius: 10px !important;
}
</style>
