<template>
  <div class="container">
    <a-row>
      <a-row type="flex" justify="center" align="top">
        <a-col :span="6">
          <div>
            <h1 class="titulo">Registrar</h1>
          </div>
        </a-col>
      </a-row>

      <a-row type="flex" justify="center">
        <a-col :span="12">
          <form @submit.prevent="login()">
            <a-input
              style=" margin-top : 10px "
              v-model="usuario.username"
              type="text"
              placeholder="Usuario"
            />

            <a-input
              style=" margin-top : 10px "
              v-model="usuario.email"
              type="text"
              placeholder="email"
            />

            <a-input
              style=" margin-top : 10px "
              v-model="usuario.name"
              type="text"
              placeholder="name"
            />

            <a-input
              style=" margin-top : 10px "
              v-model="usuario.lastname"
              type="text"
              placeholder="lastname"
            />

            <a-input
              style=" margin-top : 10px "
              v-model="usuario.password"
              type="password"
              placeholder="Contraseña"
            />
            <a-button
              :loading="loading"
              type="primary"
              html-type="submit"
              style=" margin-top : 10px "
              class="login-form-button"
              block
            >ingresar</a-button>
          </form>
        </a-col>
      </a-row>
    </a-row>
  </div>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  layout: "custom",
  data() {
    return {
      loading: false,
      incio: "",
      formError: null,
      usuario: {
        password: null,
        email: null,
        lastname: null,
        name: null,
        username: null
      },
      respuesta: ""
    };
  },
  methods: {
    async login() {
      try {
        await axios.post("registro", this.usuario).then(res => {
          console.log(res);
        });
        this.usuario = {
          password: null,
          email: null,
          lastname: null,
          name: null,
          username: null
        };

        this.$router.push("/");
      } catch (error) {
        this.usuario = {
          password: null,
          email: null,
          lastname: null,
          name: null,
          username: null
        };

        this.$router.push("/registrar");
      }
    }
  }
};
</script>
<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>