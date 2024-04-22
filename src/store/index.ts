import Vuex from "vuex";
import userModule from "./modules/UserModule";

export default new Vuex.Store({
  modules: {
    userModule: userModule,
  },
});
