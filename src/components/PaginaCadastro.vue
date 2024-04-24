<template>
  <section class="h-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card card-cadastro my-4">
            <div class="row g-0">
              <div class="col-xl-6 d-none d-xl-block">
                <img
                  src="assets/images/floresta-c.jpg"
                  class="img-fluid"
                  style="
                    border-top-left-radius: 0.25rem;
                    border-bottom-left-radius: 0.25rem;
                  "
                />
              </div>
              <div class="col-xl-6">
                <div class="card-body p-md-5 text-black">
                  <h2 class="mb-4 text-uppercase">Cadastre-se</h2>
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="nome">Nome</label>
                        <b-form-input
                          id="nome"
                          type="text"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="sobrenome"
                          >Sobrenome</label
                        >
                        <b-form-input
                          id="sobrenome"
                          type="text"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                  </div>
                  <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="email">E-mail</label>
                    <b-form-input
                      id="email"
                      type="text"
                      size="lg"
                      required
                    ></b-form-input>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="senha">Senha</label>
                        <b-form-input
                          id="senha"
                          type="password"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="resenha"
                          >Repetir Senha</label
                        >
                        <b-form-input
                          id="resenha"
                          type="password"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                  </div>

                  <hr class="hr" />

                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="cep">CEP</label>
                        <b-form-input
                          id="cep"
                          type="text"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="rua">Rua</label>
                        <b-form-input
                          id="rua"
                          type="text"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="bairro">Bairro</label>
                        <b-form-input
                          id="bairro"
                          type="text"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="cidade">Cidade</label>
                        <b-form-input
                          id="cidade"
                          type="text"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="estado">Estado</label>
                        <b-form-input
                          id="estado"
                          type="text"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="casa">N º Casa</label>
                        <b-form-input
                          id="casa"
                          type="number"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                    <div class="col-md-12 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="complemento"
                          >Complemento</label
                        >
                        <b-form-input
                          id="complemento"
                          type="text"
                          size="lg"
                          required
                        ></b-form-input>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-end pt-3">
                    <b-button variant="outline-success" type="submit" size="lg"
                      >Cadastrar</b-button
                    >
                  </div>
                </div>
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
export default class PaginaCadastro extends Vue {
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
</style>
