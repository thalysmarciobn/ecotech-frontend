<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="panel panel-login">
            <div class="panel-heading">
              <div class="row">
                <div class="col-xs-6">
                  <a href="#" class="active" @click="showLoginForm" id="login-form-link">Login</a>
                </div>
                <div class="col-xs-6">
                  <a href="#" @click="showRegisterForm" id="register-form-link">Cadastro</a>
                </div>
              </div>
              <hr>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-lg-12">
                  <form id="login-form" @submit.prevent="login" method="post" role="form" style="display: block;">
                    <div class="form-group">
                      <input v-model="username" type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Nome de Usuário" required>
                    </div>
                    <div class="form-group">
                      <input v-model="password" type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Senha" required>
                    </div>
                    <div class="form-group text-center">
                      <input type="checkbox" tabindex="3" class="" name="remember" id="remember">
                      <label for="remember">Lembre-me</label>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                          <button type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login">Log In</button>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-lg-12 text-center">
                          <a href="#" tabindex="5" class="forgot-password">Esqueceu a senha?</a>
                        </div>
                      </div>
                    </div>
                  </form>
                  <form id="register-form" action="https://phpoll.com/register/process" method="post" role="form" style="display: none;">
                    <div class="form-group">
                      <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Nome de Usuário" value="">
                    </div>
                    <div class="form-group">
                      <input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Endereço de E-mail" value="">
                    </div>
                    <div class="form-group">
                      <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Senha">
                    </div>
                    <div class="form-group">
                      <input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirmar Senha">
                    </div>
                    <!-- Novos campos adicionados -->
                    <div class="form-group">
                      <input type="text" name="endereco" id="endereco" tabindex="3" class="form-control" placeholder="Endereço">
                    </div>
                    <div class="form-group">
                      <input type="text" name="rua" id="rua" tabindex="4" class="form-control" placeholder="Rua">
                    </div>
                    <div class="form-group">
                      <input type="text" name="bairro" id="bairro" tabindex="5" class="form-control" placeholder="Bairro">
                    </div>
                    <div class="form-group">
                      <input type="text" name="cidade" id="cidade" tabindex="6" class="form-control" placeholder="Cidade">
                    </div>
                    <div class="form-group">
                      <input type="text" name="estado" id="estado" tabindex="7" class="form-control" placeholder="Estado">
                    </div>
                    <div class="form-group">
                      <input type="text" name="numero_casa" id="numero_casa" tabindex="8" class="form-control" placeholder="Número da Casa">
                    </div>
                    <div class="form-group">
                      <input type="text" name="complemento" id="complemento" tabindex="9" class="form-control" placeholder="Complemento">
                    </div>
                    <div class="form-group">
                      <input type="text" name="cep" id="cep" tabindex="10" class="form-control" placeholder="CEP">
                    </div>
                    <!-- Fim dos novos campos -->
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                          <button type="submit" name="register-submit" id="register-submit" tabindex="11" class="form-control btn btn-register">Registrar Agora</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <!-- Painel de Endereços Cadastrados -->
          <div class="panel panel-address">
            <div class="panel-heading">
              Endereços Cadastrados
            </div>
            <div class="panel-body">
              <!-- Lista de Endereços Aqui -->
              <div v-for="(address, index) in addresses" :key="index" class="address-item">
                <p>{{ address }}</p>
                <button @click="removeAddress(index)" class="btn btn-remove">Remover</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      addresses: [] // Inicializando sem endereços
    };
  },
  methods: {
    async login() {
      // Implemente sua lógica de login aqui
      console.log('Efetuando login com:', this.username, this.password);
    },
    showLoginForm() {
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('register-form').style.display = 'none';
      document.getElementById('login-form-link').classList.add('active');
      document.getElementById('register-form-link').classList.remove('active');
    },
    showRegisterForm() {
      document.getElementById('register-form').style.display = 'block';
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('register-form-link').classList.add('active');
      document.getElementById('login-form-link').classList.remove('active');
    },
    removeAddress(index) {
      this.addresses.splice(index, 1);
    }
  }
}
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  margin: 0; 
}
.panel-login {
  border-color: #ccc;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  position: center;
  margin: 150px auto;
  max-width: 400px; /* Reduzindo o tamanho da caixa de login */
}
.panel-login > .panel-heading {
  color: #00415d;
  background-color: #fff;
  border-color: #fff;
  text-align:center;
  margin: 0 auto;
}
.panel-login > .panel-heading a {
  text-decoration: none;
  color: #666;
  font-weight: bold;
  font-size: 15px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.panel-login > .panel-heading a.active {
  color: #029f5b;
  font-size: 18px;
}
.panel-login > .panel-heading hr {
  margin-top: 10px;
  margin-bottom: 0px;
  clear: both;
  border: 0;
  height: 1px;
  background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
  background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
  background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
  background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
}
.panel-login input[type="text"],
.panel-login input[type="email"],
.panel-login input[type="password"] {
  height: 45px;
  border: 1px solid #ddd;
  font-size: 16px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.panel-login input:hover,
.panel-login input:focus {
  outline:none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-color: #ccc;
}
.btn-login {
  background-color: #59B2E0;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #59B2E6;
}
.btn-login:hover,
.btn-login:focus {
  color: #fff;
  background-color: #53A3CD;
  border-color: #53A3CD;
}
.forgot-password {
  text-decoration: underline;
  color: #888;
}
.forgot-password:hover,
.forgot-password:focus {
  text-decoration: underline;
  color: #666;
}
.btn-register {
  background-color: #1CB94E;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #1CB94A;
}
.btn-register:hover,
.btn-register:focus {
  color: #fff;
  background-color: #1CA347;
  border-color: #1CA347;
}

/* Estilos para o Painel de Endereços */
.panel-address {
  border-color: #ccc;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
  margin-top: 30px;
}
.panel-address .panel-heading {
  background-color: #f5f5f5;
  color: #333;
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
}
.panel-address .panel-body {
  padding: 20px;
}
.address-item {
  margin-bottom: 10px;
}
.btn-remove {
  background-color: #d9534f;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.btn-remove:hover {
  background-color: #c9302c;
}
</style>
