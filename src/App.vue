<template>
  <PainelHeader v-if="!terPainel"></PainelHeader>
  <template v-if="naHome || noCadastro || noLogin">
    <router-view></router-view>
  </template>
  <template v-else>
    <b-container id="app-eco">
      <b-row>
        <router-view></router-view>
      </b-row>
    </b-container>
  </template>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import "./assets/css/app.css";
import UserModule from "./store/modules/UserModule";
import { getModule } from "vuex-module-decorators";
import store from "@/store";
import PainelHeader from "./components/Painel/PainelHeader.vue";
import User from "./types/User";

@Options({
  components: {
    PainelHeader,
  },
})
export default class App extends Vue {
  private userModule: UserModule = getModule(UserModule, store);

  get user(): User | null {
    return this.userModule.user;
  }

  get naHome(): boolean {
    return this.$route.fullPath === "/";
  }

  get noCadastro(): boolean {
    return this.$route.fullPath === "/cadastro";
  }

  get noLogin(): boolean {
    return this.$route.fullPath === "/login";
  }

  get terPainel(): boolean {
    const rota: String = this.$route.fullPath;
    return rota === "/" || rota === "/login" || rota === "/cadastro";
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f9f9f9;
}

.card-eco {
  box-shadow: 0px 0px 20px 0px #eee;
  border: 1px solid #e9e9e9 !important;
  border-radius: 10px !important;
  background: #fff;
  overflow: hidden;
}

.table-eco {
  box-shadow: 0px 0px 20px 0px #eee;
  border: 1px solid #e9e9e9 !important;
  border-radius: 10px !important;
  background: #fff;
}

.alert {
  border: 2px solid #00000012 !important;
  border-radius: 0 !important;
}
</style>
