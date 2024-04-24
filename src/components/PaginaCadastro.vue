<template>
  <section class="bg-image h-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-7">
          <header
            class="d-flex logo justify-content-between align-items-center"
          >
            <div>
              <h1>
                <span class="leaf-icon">&#127810;</span
                ><span class="eco-tech-name">EcoTech</span>
              </h1>
            </div>
            <div>
              <router-link
                style="color: #ffffff"
                class="btn btn-outline-light"
                to="/login"
                >Login</router-link
              >
            </div>
          </header>
          <b-col v-if="msg != ''" cols="12">
            <div
              role="alert"
              aria-live="polite"
              aria-atomic="true"
              class="mb-2 mt-3 alert alert-info"
            >
              <div v-html="msg"></div>
            </div>
          </b-col>
          <div class="card card-cadastro my-4">
            <div class="row g-0">
              <div class="col-xl-12">
                <div class="card-body p-md-5 text-black">
                  <form @submit.prevent="cadastrar" class="space-y-6">
                    <div class="row">
                      <div class="col-md-12 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="nome"
                            >Nome Completo</label
                          >
                          <b-form-input
                            id="nome"
                            v-model="usuario"
                            type="text"
                            size="lg"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                    </div>
                    <div class="form-outline mb-4">
                      <label class="form-label" for="email">E-mail</label>
                      <b-form-input
                        id="email"
                        type="text"
                        size="lg"
                        v-model="email"
                        required
                      ></b-form-input>
                    </div>
                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="senha">Senha</label>
                          <b-form-input
                            id="senha"
                            type="password"
                            size="lg"
                            v-model="senha"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="resenha"
                            >Repetir Senha</label
                          >
                          <b-form-input
                            id="resenha"
                            type="password"
                            size="lg"
                            v-model="senha2"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                    </div>

                    <hr class="hr" />

                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="cep">CEP</label>
                          <b-form-input
                            id="cep"
                            type="text"
                            size="lg"
                            @input="pesquisarCep"
                            debounce="500"
                            v-model="cep"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="rua">Rua</label>
                          <b-form-input
                            id="rua"
                            type="text"
                            v-model="rua"
                            size="lg"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="bairro">Bairro</label>
                          <b-form-input
                            id="bairro"
                            type="text"
                            size="lg"
                            v-model="bairro"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="cidade">Cidade</label>
                          <b-form-input
                            id="cidade"
                            type="text"
                            size="lg"
                            v-model="cidade"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="estado">Estado</label>
                          <b-form-input
                            id="estado"
                            type="text"
                            size="lg"
                            v-model="estado"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="casa">N º Casa</label>
                          <b-form-input
                            id="casa"
                            type="number"
                            size="lg"
                            v-model="casa"
                            required
                          ></b-form-input>
                        </div>
                      </div>
                      <div class="col-md-12 mb-4">
                        <div class="form-outline">
                          <label class="form-label" for="complemento"
                            >Complemento</label
                          >
                          <b-form-input
                            id="complemento"
                            type="text"
                            size="lg"
                            v-model="complemento"
                          ></b-form-input>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-content-end pt-3">
                      <b-button
                        variant="outline-success"
                        type="submit"
                        size="lg"
                        >Cadastrar</b-button
                      >
                    </div>
                  </form>
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
import ViacepService from "@/services/ViacepService";
import ViacepResultado from "@/types/ViacepResultado";

@Options({
  props: {
    msg: String,
  },
})
export default class PaginaCadastro extends Vue {
  private userModule: UserModule = getModule(UserModule, store);
  public msg: string = "";
  public variant: string = "";

  public usuario: string = "";
  public email: string = "";
  public senha: string = "";
  public senha2: string = "";

  public cep: string = "";
  public bairro: string = "";
  public cidade: string = "";
  public estado: string = "";
  public rua: string = "";
  public casa: number = 1;
  public complemento: string = "";
  private timeout: any = null;
  private pesquisando: boolean = false;

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

  pesquisarCep() {
    if (this.pesquisando) {
      return;
    }
    this.pesquisando = true;
    this.timeout = setTimeout(async () => {
      ViacepService.checar(this.cep)
        .then((data: ViacepResultado) => {
          this.estado = data.uf;
          this.cidade = data.localidade;
          this.cep = data.cep;
          this.bairro = data.bairro;
          this.rua = data.logradouro;
          this.complemento = data.complemento;
          this.casa = 1;
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          this.pesquisando = false;
        });
    }, 500);
  }

  async cadastrar() {
    if (this.senha !== this.senha2) {
      this.msg = "As senhas digitadas não coincidem.";
      this.variant = "alert alert-info";
      window.scrollTo(0, 0);
      return;
    }
    const dado = await UserService.cadastrar(
      this.usuario,
      this.email,
      this.senha,
      this.cep,
      this.bairro,
      this.cidade,
      this.estado,
      this.rua,
      this.casa,
      this.complemento
    );
    if (dado.data.codigo == "logado") {
      this.userModule.setUser(dado.data.usuario);
      this.$cookies.set("chave", dado.data.chave, "24h");
      this.$router.push("painel");
    } else if (dado.data.codigo == "email_existente") {
      this.msg = `Já existe um usuário com o e-mail <b>${this.email}</b>.`;
      this.variant = "alert alert-info";
      window.scrollTo(0, 0);
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
.bg-image {
  background-image: url("https://grupoaltotiete.com.br/wp-content/uploads/2023/11/Grupo-Alto-Tiete-Reciclagem-7-perguntas-comuns-para-comecar.jpg");
  background-size: cover;
  background-position: center;
  height: 100%;
}
.logo {
  color: #ffffff;
}
.eco-tech-name {
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
