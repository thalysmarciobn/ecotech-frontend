<template>
  <b-col cols="12" class="mt-5 mb-5">
    <b-row>
      <b-col cols="3">
        <b-card tag="solicitacoes" class="mb-2 card-eco">
          <b-card-text>
            <b-card-text>
              <h1>{{ formatarNumero(qt_solicitacoes) }}</h1>
              <span>Solicitações</span>
            </b-card-text>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="3">
        <b-card tag="solicitacoes" class="mb-2 card-eco">
          <b-card-text>
            <b-card-text>
              <h1>{{ formatarNumero(qt_recebimentos) }}</h1>
              <span>Recebimentos</span>
            </b-card-text>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="3">
        <b-card tag="recebimentos" class="mb-2 card-eco">
          <b-card-text>
            <h1>{{ formatarNumero(total_ecorecebido) }}</h1>
            <span>Total Eco Recebido</span>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="3">
        <b-card tag="eco" class="mb-2 card-eco">
          <b-card-text>
            <h1>{{ formatarNumero(total_realrecebido, 2) }} R$</h1>
            <span>Total Recebido</span>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-col>
  <b-col cols="12">
    <b-form-input
      v-model="pesquisa"
      size="lg"
      @input="pesquisar"
      debounce="500"
      placeholder="Procurar Solicitação..."
    ></b-form-input>
    <b-table
      style="max-height: 400px; overflow-y: auto"
      class="table-eco mt-4"
      hover
      ref="table"
      :items="dados"
      :fields="fields"
    >
      <template v-slot:cell(vl_status)="{ item }">
        <span>
          <template v-if="item.vl_status === 0"> Pendente </template>
          <template v-if="item.vl_status === 1"> Aceito </template>
          <template v-if="item.vl_status === -1"> Negado </template>
        </span>
      </template>
      <template v-slot:cell(qt_material)="{ item }">
        <span>{{ item.qt_material }} {{ item.sg_medida }}</span>
      </template>
      <template v-slot:cell(dt_solicitacao)="{ item }">
        <span>{{ formatarData(item.dt_solicitacao) }}</span>
      </template>
    </b-table>
  </b-col>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserModule from "@/store/modules/UserModule";
import { getModule } from "vuex-module-decorators";
import store from "@/store";
import User from "@/types/User";
import UserService from "../services/UserService";
import { format } from "date-fns";

@Options({
  components: {},
  props: {
    msg: String,
  },
})
export default class Painel extends Vue {
  private userModule: UserModule = getModule(UserModule, store);
  public dados: Array<any> = [];
  public fields: Array<any> = [
    { key: "nm_codigo", label: "Código" },
    { key: "nm_material", label: "Material" },
    { key: "qt_material", label: "Quantidade" },
    { key: "vl_status", label: "Status" },
    { key: "dt_solicitacao", label: "Data de Solicitação" },
  ];
  private paginaTotal: number = 1;
  private pagina: number = 1;
  private proximaPagina: number | null = 1;
  private porPagina: number = 10;
  private carregando: boolean = false;
  private pesquisando: boolean = false;

  public pesquisa: string = "";

  public qt_recebimentos: number = 0;
  public qt_solicitacoes: number = 0;
  public total_ecorecebido: number = 0;
  public total_realrecebido: number = 0;

  private timeout: any = null;

  get user(): User | null {
    return this.userModule.user;
  }

  get solicitacoes(): Array<any> {
    return this.dados;
  }

  async carregdarDados(): Promise<void> {
    const chave = this.$cookies.get("chave");
    if (!chave) {
      return;
    }
    await UserService.dados(chave).then((data: any) => {
      if (data.codigo === "recebido") {
        this.qt_recebimentos = data.dados.qt_recebimentos;
        this.qt_solicitacoes = data.dados.qt_solicitacoes;
        this.total_ecorecebido = data.dados.total_ecorecebido;
        this.total_realrecebido = data.dados.total_realrecebido;
      }
    });
  }

  async carregarSolicitacoes(proximaPagina: boolean = true): Promise<void> {
    const chave = this.$cookies.get("chave");
    if (!chave) return;
    if (this.carregando === true) return;
    this.carregando = true;
    if (this.proximaPagina !== null) {
      await UserService.solicitacoes(
        chave,
        proximaPagina ? this.proximaPagina : this.pagina,
        this.porPagina,
        this.pesquisa
      ).then((data: any) => {
        if (data.codigo == "recebido") {
          this.paginaTotal = data.dados.total_paginas;
          this.proximaPagina = data.dados.proxima_pagina;
          this.pagina = data.dados.pagina;
          this.dados = [...this.dados, ...data.dados.lista];
        }
        this.carregando = false;
      });
    }
  }

  async recarregarSolicitacoes() {
    this.dados = [];
    this.proximaPagina = 1;
    this.pagina = 1;
    await this.carregarSolicitacoes(false);
  }

  pesquisar() {
    if (this.pesquisando) {
      return;
    }
    this.pesquisando = true;
    this.timeout = setTimeout(async () => {
      await this.recarregarSolicitacoes();
      this.pesquisando = false;
    }, 500);
  }

  formatarNumero(valor: number, minimumFractionDigits: number = 0): string {
    const valorCentavos = Math.round(valor * 100);
    return (valorCentavos / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: minimumFractionDigits,
    });
  }

  formatarData(data: string) {
    return format(new Date(data), "dd/MM/yyyy HH:mm:ss");
  }

  async created(): Promise<void> {
    await this.carregdarDados();
    await this.carregarSolicitacoes();
    window.addEventListener("scroll", this.handleScroll);
  }

  async beforeUnmount(): Promise<void> {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(): void {
    const table = this.$refs.table as any;
    if (table == null || table == undefined) {
      return;
    }
    const el = table.$el;
    if (table == null || table == undefined) {
      return;
    }
    const bottomOfTable = el.getBoundingClientRect().bottom;
    if (bottomOfTable <= window.innerHeight && !this.carregando) {
      this.carregarSolicitacoes();
    }
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
