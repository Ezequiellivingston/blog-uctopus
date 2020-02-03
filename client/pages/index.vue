<template>
  <div class="container">
    <div class="carta">
      <a-row>
        <postear v-if="auth" @refresPost="NuevoPost()" />
        <template v-for="(posts, index) in post">
          <Carta-de-Post :key="index" :DatosDePost="posts" />
        </template>
      </a-row>
    </div>
  </div>
</template>

<script>
import Postear from "~/components/common/Postear";
import CartaDePost from "~/components/common/CartaDePost";

import axios from "~/plugins/axios";
export default {
  components: {
    CartaDePost,
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
      await axios.get("postsApproved").then(res => {
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
