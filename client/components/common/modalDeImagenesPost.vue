<template>
  <div class="container">
    <a-modal width="1000px" class="modal" :title="informacion.title" v-model="activarModal">
      <p>{{informacion.body}}</p>
      <img class="image" :src="informacion.image" />
    </a-modal>
  </div>
</template>
<script>
export default {
  
  props: {
    activarModal: {
      type: Boolean,

      require: true
    },
    informacion: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {}
};
</script>
<style scoped>
.image {
  width: 100%;
}
</style>