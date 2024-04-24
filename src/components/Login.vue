<template>
  <section class="bg-image">
    <header class="d-flex justify-content-between align-items-center p-3">
      <div>
        <h1>
          <span class="leaf-icon">&#127810;</span
          ><span class="eco-tech-name">EcoTech</span>
        </h1>
      </div>
      <div>
        <button class="btn btn-outline-light" @click="cadastreSe">
          Cadastre-se
        </button>
      </div>
    </header>
    <div class="mask">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card" style="border-radius: 10px; margin: auto">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-4">Login</h2>

                <form @submit.prevent="login">
                  <div class="form-outline mb-4">
                    <input
                      v-model="formData.email"
                      type="email"
                      id="email"
                      class="form-control form-control-lg"
                      placeholder="Digite seu e-mail"
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      v-model="formData.senha"
                      type="password"
                      id="senha"
                      class="form-control form-control-lg"
                      placeholder="Digite sua senha"
                    />
                  </div>

                  <div class="d-grid gap-2">
                    <button
                      type="submit"
                      class="btn btn-success btn-lg text-body"
                    >
                      Entrar
                    </button>
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

<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        senha: "",
      },
    };
  },
  methods: {
    login() {
      console.log("Email:", this.formData.email);
      console.log("Senha:", this.formData.senha);
      // Adicione aqui a lógica de autenticação
    },
    cadastreSe() {
      // Adicione aqui a lógica para redirecionar para a página de cadastro
      console.log("Redirecionar para a página de cadastro");
    },
  },
};
</script>

<style>
@media (min-width: 992px) {
  .col-lg-6 {
    flex: 0 0 auto;
    width: 64%;
    margin: auto;
  }
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.bg-image {
  background-image: url("https://grupoaltotiete.com.br/wp-content/uploads/2023/11/Grupo-Alto-Tiete-Reciclagem-7-perguntas-comuns-para-comecar.jpg");
  background-size: cover;
  background-position: center;
  height: 100%;
}

.mask {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 11vh;
}

.card {
  width: 80%;
  max-width: 100%;
  padding-right: 0;
}

.eco-tech-name {
  color: white;
}
</style>
