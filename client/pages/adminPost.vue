<template>
  <div class="container">
    <div class="listaDePost">
      <modal-de-imagenes-post
        :informacion="imagenfull"
        :activarModal="MasInformacion"
        @minimizar="minimizarImagen()"
      />
      <a-list itemLayout="horizontal" :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item" @dblclick="imageFull(item)">
          <a slot="actions" @click="aprovarPost(item)">aceptar</a>
          <a slot="actions" @click="eliminar()">eliminar</a>
          <a-list-item-meta :description="item.body">
            <a slot="title" href="https://www.antdv.com/">{{item.title}}</a>

            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
          <div>
            <a-modal
              title="¿Esta seguro que quiere eliminar este post?"
              v-model="modal"
              @ok="desaprovarPost(item)"
            >
              <p>Si elimina este post se no se podran restaurar los datos...</p>
            </a-modal>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import Cookie from "js-cookie";

import modalDeImagenesPost from "~/components/common/modalDeImagenesPost.vue";

export default {
  middleware: "admin",

  components: { modalDeImagenesPost },

  data() {
    return {
      data: [],
      MasInformacion: false,
      imagenfull: [],
      modal: false
    };
  },
  mounted() {
    this.posts();
  },
  methods: {
    eliminar() {
      this.modal = true;
    },
    async posts() {
      await axios.get("postsNoApproved").then(res => {
        this.data = res.data;
        console.log(res.data);
      });
    },
    imageFull(item) {
      this.MasInformacion = !this.MasInformacion;
      this.imagenfull = item;
    },
    minimizarImagen() {},
    async desaprovarPost(item) {
      let token = Cookie.get("token");
      await axios.delete(`posts/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.posts();

      this.modal = false;
    },
    async aprovarPost(item) {
      let token = Cookie.get("token");
      let post = {
        title: item.title,
        body: item.body,
        image: item.image,
        approved: 1
      };
      await axios
        .put(`posts/${item.id}`, post, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.modal = false;
          console.log(res);
        });
      this.posts();
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;

  background: rgb(240, 240, 240);
}
.listaDePost {
  min-height: 100vh;
  margin-top: 20px;
  width: 80%;

  background: white;
}
</style>