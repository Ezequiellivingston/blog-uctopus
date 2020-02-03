<template>
  <div class="container">
    <div class="carta">
      <a-row>
        <postear v-if="auth" @refresPost="NuevoPost()" />
        <template v-for="(posts, index) in post">
          <Carta-mi-Post :key="index" :DatosDePost="posts" />
        </template>
      </a-row>
    </div>
  </div>
</template>

<script>
import Postear from "~/components/common/Postear";
import CartaMiPost from "~/components/common/CartaMiPost";
import Cookie from "js-cookie";

import axios from "~/plugins/axios";
export default {
  components: {
    CartaMiPost,
    Postear
  },
  data: () => ({
    post: []
  }),
  mounted() {
    this.posts();
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    }
  },
  methods: {
    async posts() {
      let token = Cookie.get("token");
      console.log(token);
      await axios
        .get("postsUsers", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.post = res.data;
        });
    },
    NuevoPost() {
      this.posts();
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
.carta {
  width: 80%;

  margin-top: 10px;
}
</style>
