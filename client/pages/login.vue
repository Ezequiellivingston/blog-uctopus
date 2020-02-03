<template>
  <div class="container">
    <a-row>
      <a-row type="flex" justify="center" align="top">
        <a-col :span="12">
          <div>
            <h1 class="titulo">iniciar sesion</h1>
          </div>
        </a-col>
      </a-row>

      <a-row type="flex" justify="center">
        <a-col :span="24" style="width: 350px ;">
          <form @submit.prevent="login()">
            <a-input v-model="usuario.email" type="text" placeholder="email" />

            <a-input
              v-model="usuario.password"
              type="password"
              placeholder="Contraseña"
              style=" margin-top : 10px "
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
          <p v-if="error" style="color:red">no existe el usuario</p>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center" align="top"></a-row>
    </a-row>
  </div>
</template>

<script>
export default {
  layout: "custom",

  data() {
    return {
      error: null,
      loading: false,
      usuario: { password: null, email: null }
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        await this.$store.dispatch("login", {
          email: this.usuario.email,
          password: this.usuario.password
        });
        this.usuario.email = "";
        this.usuario.password = "";
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }

      this.error = true;
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
