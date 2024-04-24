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
        <button class="btn btn-outline-light" @click="login">Login</button>
      </div>
    </header>
    <div class="mask">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div
              class="card"
              style="border-radius: 10px; width: 100%; max-width: 500px"
            >
              <div class="card-body p-3">
                <h2 class="text-uppercase text-center mb-3">Cadastro</h2>

                <form @submit.prevent="submitForm">
                  <div class="mb-3">
                    <div class="row">
                      <div class="col">
                        <div class="form-outline">
                          <input
                            v-model="formData.nome"
                            type="text"
                            id="nome"
                            class="form-control form-control-lg"
                          />
                          <label class="form-label" for="nome">Nome</label>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-outline">
                          <input
                            v-model="formData.sobrenome"
                            type="text"
                            id="sobrenome"
                            class="form-control form-control-lg"
                          />
                          <label class="form-label" for="sobrenome"
                            >Sobrenome</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-outline mb-3">
                    <input
                      v-model="formData.email"
                      type="email"
                      id="email"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="email">Seu E-mail</label>
                  </div>

                  <div class="form-outline mb-3">
                    <input
                      v-model="formData.senha"
                      type="password"
                      id="senha"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="senha">Senha</label>
                  </div>

                  <div class="form-outline mb-3">
                    <input
                      v-model="formData.confirmarSenha"
                      type="password"
                      id="confirmarSenha"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="confirmarSenha"
                      >Confirmar senha</label
                    >
                  </div>

                  <div class="form-check d-flex justify-content-center mb-3">
                    <input
                      v-model="formData.concordarTermos"
                      class="form-check-input me-2"
                      type="checkbox"
                      id="concordarTermos"
                    />
                    <label class="form-check-label" for="concordarTermos">
                      Lembre-me
                    </label>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      type="submit"
                      class="btn btn-success btn-lg text-body"
                    >
                      Registrar
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
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        concordarTermos: false,
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Formulário enviado com os seguintes dados:", this.formData);
    },
    login() {
      // Adicione aqui a lógica para redirecionar para a página de login
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
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
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.card {
  max-width: 100%;
}

.gradient-custom-3 {
  background: linear-gradient(45deg, #09ff00, #a5ecab);
}

.eco-tech-name {
  color: white;
}
</style>
