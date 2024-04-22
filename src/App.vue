<template>
  <PainelHeader></PainelHeader>
  <b-container id="app-eco">
    <b-row>
      <router-view></router-view>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserService from "./services/UserService";
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
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
</style>
