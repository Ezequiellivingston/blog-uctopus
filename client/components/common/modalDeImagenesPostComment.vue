<template>
  <div class="container">
    <a-modal width="1000px" class="modal" :title="informacion.title" v-model="activarModal">
      <p>{{informacion.body}}</p>
      <img class="image" :src="informacion.image" />

      <div v-if="auth">
        <a-list
          v-if="comments.length"
          :dataSource="comments"
          :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
          itemLayout="horizontal"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-comment
              avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              :content="item.comment"
              :datetime="item.datetime"
            ></a-comment>
          </a-list-item>
        </a-list>
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4" @change="handleChange" :value="value"></a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button
                htmlType="submit"
                :loading="submitting"
                @click="handleSubmit"
                type="primary"
              >Add Comment</a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
    </a-modal>
  </div>
</template>
<script>
import moment from "moment";
import axios from "~/plugins/axios";
export default {
  props: {
    activarModal: {
      type: Boolean,

      require: true
    },
    informacion: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      visible: false,
      comentario: "",
      comments: [],
      submitting: false,
      value: "",
      moment
    };
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    }
  },
  mounted() {
    this.getcomments();
  },
  methods: {
    async getcomments() {
      await axios.get(`comment/${this.informacion.id}`).then(res => {
        this.comments = res.data;
      });
    },
    async handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;

        this.value = "";
      }, 1000);
      await axios
        .post(`comment/${this.informacion.id}`, {
          comment: this.value
        })
        .then(res => {
          this.getcomments();
        });
    },
    handleChange(e) {
      this.value = e.target.value;
    }
  }
};
</script>
<style scoped>
.image {
  width: 100%;
}
</style>