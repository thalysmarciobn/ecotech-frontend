<template>
  <section class="h-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-6">
          <div class="card card-cadastro my-4">
            <div class="row g-0">
              <div class="login-pd">
                <form @submit.prevent="login" class="space-y-6">
                  <div class="mt-2">
                    <div class="col-md-12">
                      <div class="form-outline">
                        <label class="form-label" for="email">Email</label>
                        <b-form-input
                          id="email"
                          type="email"
                          size="lg"
                          v-model="email"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                  </div>
                  <div class="mt-2">
                    <div class="col-md-12">
                      <div class="form-outline">
                        <label class="form-label" for="senha">Senha</label>
                        <b-form-input
                          id="senha"
                          type="password"
                          size="lg"
                          v-model="password"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end pt-3">
                    <b-button
                      variant="outline-success"
                      type="submit"
                      size="lg"
                      style="min-width: 120pt"
                      >Logar</b-button
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserService from "@/services/UserService";
import UserModule from "@/store/modules/UserModule";
import { getModule } from "vuex-module-decorators";
import store from "@/store";
import ChecarUsuario from "@/types/ChecarUsuario";

@Options({
  props: {
    msg: String,
  },
})
export default class Login extends Vue {
  private userModule: UserModule = getModule(UserModule, store);

  email: string = "";
  password: string = "";

  async mounted(): Promise<void> {
    const chave = this.$cookies.get("chave");
    if (!chave) {
      return;
    }
    const data = await UserService.checar(chave);
    if (data.codigo == "logado") {
      this.userModule.setUser(data.usuario);
      this.$router.push("painel");
    }
  }

  async login() {
    const dado = await UserService.logar(this.email, this.password);
    if (dado.data.codigo == "logado") {
      this.userModule.setUser(dado.data.usuario);
      this.$cookies.set("chave", dado.data.chave, "24h");
      this.$router.push("painel");
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
.login-pd {
  padding: 25px;
}
</style>
