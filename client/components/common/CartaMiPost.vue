<template>
  <a-card hoverable style="width: 90%">
    <img alt="example" :src="DatosDePost.image" slot="cover" />
    <template class="ant-card-actions" slot="actions">
      <a-icon v-if="auth" type="edit" @click="edit()" />
    </template>
    <a-card-meta :title="DatosDePost.title" :description="DatosDePost.body">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </a-card-meta>
    <edit v-if="visibilid" :itemEditId="DatosDePost.id" />
  </a-card>
</template>

<script>
import edit from "~/components/common/edit";
export default {
  components: {
    edit
  },
  props: {
    DatosDePost: {
      type: Object,
      require: true
    }
  },
  data: () => ({
    visibilid: false
  }),
  methods: {
    async edit(val) {
      this.visibilid = true;
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    }
  }
};
</script>

<style>
</style>