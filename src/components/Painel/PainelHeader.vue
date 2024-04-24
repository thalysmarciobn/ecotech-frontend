<template>
  <b-navbar
    class="navbar"
    variant="green"
    toggleable="lg"
    type="dark"
    sticky="true"
  >
    <b-navbar-brand>EcoTech</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav fill>
        <b-nav-item class="navbar-link" to="/painel">Relatórios</b-nav-item>
        <b-nav-item to="/gerar-solicitacao">Gerar Solicitação</b-nav-item>
        <b-nav-item to="/produtos">Loja de Produtos</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" justified v-if="usuario">
        <b-nav-item
          >Saldo: <b>{{ formatarNumero(saldoEco) }}</b></b-nav-item
        >
        <b-nav-item-dropdown :text="bemVindo" right>
          <b-dropdown-item to="/enderecos">Endereços</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="mudarSair()">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <b-modal v-model="sairModal" hide-header hide-footer>
    <h2 class="text-break text-center mt-3 mb-5">Você deseja sair?</h2>
    <b-button-group style="width: 100%">
      <b-button @click="executarSair()" variant="outline-success"
        >Sair</b-button
      >
      <b-button @click="mudarSair()" variant="outline-danger"
        >Cancelar</b-button
      >
    </b-button-group>
  </b-modal>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import UserModule from "@/store/modules/UserModule";
import store from "@/store";
import User from "@/types/User";

export default class AppHeaderMenu extends Vue {
  private userModule: UserModule = getModule(UserModule, store);
  public sairModal: boolean = false;

  get bemVindo(): string {
    return "Bem-vindo(a): " + this.userModule.user?.nm_usuario;
  }

  get saldoEco(): number {
    return this.userModule.user ? this.userModule.user.qt_ecosaldo : 0;
  }

  get usuario(): User | null {
    return this.userModule.user;
  }

  mudarSair(): void {
    this.sairModal = !this.sairModal;
  }

  executarSair(): void {
    this.$cookies.set("chave", "", "1h");
    this.userModule.setUser(null);
    this.$router.push("login");
    this.sairModal = false;
  }

  formatarNumero(valor: number, minimumFractionDigits: number = 0): string {
    const valorCentavos = Math.round(valor * 100);
    return (valorCentavos / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: minimumFractionDigits,
    });
  }
}
</script>

<style>
.navbar .navbar-brand {
  color: #fff !important;
  font-weight: bold;
  font-family: monospace;
  font-size: 21pt;
}

.navbar.bg-green {
  background-color: #69af07 !important;
}

.navbar.bg-green .navbar-nav .nav-link {
  color: #edffd3 !important;
  font-size: 14pt;
}

.navbar.bg-green .navbar-nav .active.nav-link {
  color: #fff !important;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #669d19 !important;
}
</style>
