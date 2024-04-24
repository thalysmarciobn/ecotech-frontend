<template>
  <div class="home">
    <div class="shadow"></div>
    <header>
      <h1><span class="leaf-icon">&#127810;</span>EcoTech</h1>
    </header>

    <div class="main-content">
      <h1
        style="
          font-size: 4rem;
          color: #35ce3b;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        "
      >
        BEM - VINDO A ECOTECH
      </h1>
      <h3
        style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); margin-bottom: 1rem"
      >
        A RECICLAGEM TRANSFORMA COISAS EM OUTRAS, O QUE É QUASE MÁGICO.
      </h3>
      <div class="button-container mt-5">
        <b-button
          style="min-width: 10pt"
          class="login-button"
          variant="outline-success"
          href="/login"
          >Login</b-button
        >
        <b-button
          class="signup-button"
          variant="outline-success"
          href="/cadastro"
          >Cadastro</b-button
        >
      </div>
    </div>
    <footer class="footer">
      <p>
        Faça o seu descarte de resíduos de forma segura, ajude o planeta e ainda
        tenha a oportunidade de converter em dinheiro.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.test {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.home {
  background-image: url("https://static.vecteezy.com/ti/fotos-gratis/p1/31095198-mundo-meio-ambiente-e-terra-dia-conceito-com-globo-dentro-a-maos-natureza-e-eco-amigaveis-ambiente-ai-generativo-gratis-foto.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  position: relative;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

header {
  position: absolute;
  top: 20px;
  left: 20px;
}

.main-content {
  padding: 20vh 10vw;
  text-align: center;
}

.button-container {
  margin-bottom: 2rem;
}

.login-button,
.signup-button {
  padding: 1rem 2rem;
  margin: 0 1rem;
  font-size: 2rem;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: transparent;
}

.login-button:hover,
.signup-button:hover {
  background-color: #1da522;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  text-align: center;
}
</style>
