<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="Botones">
        <a-button @click="home()" class="boton" shape="circle">
          <a-icon type="search" />
        </a-button>
        <a-button v-if="!auth" icon="user" class="boton" @click="registrar()">Registrar</a-button>

        <a-button v-if="!auth" icon="user" class="boton" @click="logear()">Iniciar sesion</a-button>
      </a-layout-header>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    auth() {
      return this.$store.state.auth;
    }
  },
  methods: {
    async registrar() {
      this.$router.push("/registrar");
    },
    async logear() {
      this.$router.push("/login");
    },
    async home() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
}
.Botones {
  text-align: right;

  -webkit-box-shadow: -5px 5px 13px -5px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: -5px 5px 13px -5px rgba(0, 0, 0, 0.35);
  box-shadow: -5px 5px 13px -5px rgba(0, 0, 0, 0.35);
}
.boton {
  margin: 20px;
}
</style>