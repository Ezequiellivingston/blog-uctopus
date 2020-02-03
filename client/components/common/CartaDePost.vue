<template>
  <div>
    <a-card class="card" hoverable>
      <modal-de-imagenes-post-comment
        :informacion="DatosDePost"
        :activarModal="MasInformacion"
        @minimizar="minimizarImagen()"
      />
      <img class="image" v-if="DatosDePost.image" :src="DatosDePost.image" slot="cover" />

      <template class="ant-card-actions" slot="actions" v-if="auth">
        <span>
          <a-icon type="like" @click="like(DatosDePost)" />
          {{DatosDePost.likes+likes}}
        </span>
        <a-icon type="message" @click="modalDePost()" />
        <a-icon v-if="AutoEdit(DatosDePost)" type="edit" @click="editar()" />
      </template>
      <a-card-meta :title="DatosDePost.title" :description="DatosDePost.body">
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <p slot="avatar"></p>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
import modalDeImagenesPostComment from "~/components/common/modalDeImagenesPostComment.vue";
import axios from "~/plugins/axios";
import Cookie from "js-cookie";

export default {
  components: { modalDeImagenesPostComment },
  props: {
    DatosDePost: {
      type: Object,
      require: true
    }
  },
  data: () => ({
    likes: 0,
    MasInformacion: false
  }),
  computed: {
    auth() {
      return this.$store.state.auth;
    },
    user() {
      let user = this.$store.state.user;
      return user.user;
    }
  },
  methods: {
    async username(val) {
      await axios.get("user", { params: { id: val } }).then(res => {
        return res.data.username;
      });
    },
    async like(item) {
      let token = Cookie.get("token");
      await axios
        .post(`posts/${item.id}/likes`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.data.message == "Nuevo Like") {
            this.likes++;
          } else {
            this.likes--;
          }
        });
    },
    AutoEdit(Post) {
      if (this.user.id == Post.user_id) {
        return true;
      }
      if (this.user.admin == 1) {
        return true;
      }
    },
    modalDePost() {
      this.MasInformacion = !this.MasInformacion;
    }
  }
};
</script>

<style>
.card {
  display: block;
  margin-top: 50px;
}
.image {
  object-fit: cover;
  margin: auto;

  display: initial;
  width: 100%;
  height: 500px;
}
</style>