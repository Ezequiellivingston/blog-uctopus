<template>
  <div>
    <a-layout class="fondo">
      <a-layout class="fondo">
        <a-layout-content class="fondo">
          <nav-bar />
          <nuxt class="fondo" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import NavBar from "~/components/layout/navBar.vue";
import SiderBar from "~/components/layout/siderBar.vue";

export default {
  components: {
    NavBar,
    SiderBar
  },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {}
};
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.menu {
  text-align: right;
}
.login {
}
</style>
