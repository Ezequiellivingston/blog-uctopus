<template>
  <div class="fondo">
    <a-comment>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item>
          <a-input placeholder="titulo" v-model="post.title" />
          <a-textarea :rows="4" placeholder="cuerpo" v-model="post.body"></a-textarea>
        </a-form-item>
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-form-item>
          <a-button
            :disabled="!Nonull"
            htmlType="submit"
            @click="postear(itemEditId)"
            type="primary"
          >Add Comment</a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
import Cookie from "js-cookie";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  props: {
    itemEditId: {
      type: Number,
      require: true
    }
  },
  data: () => ({
    post: {
      title: "",
      body: "",
      image: ""
    },
    loading: false,
    imageUrl: ""
  }),
  computed: {
    Nonull() {
      if (
        this.post.title == "" ||
        this.post.body == "" ||
        this.post.image == ""
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    async postear(id) {
      let token = Cookie.get("token");
      console.log(token);
      await axios
        .put(
          `posts/${id}`,
          {
            title: this.post.title,
            body: this.post.body
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(res => {});
      this.$emit("refresPost");
    },
    handleChange(info) {
      getBase64(info.file.originFileObj, img => {
        this.post.image = img;
      });

      // if (info.file.status === "uploading") {
      //   this.loading = true;
      //   return;
      // }
      // if (info.file.status === "done") {
      //   // Get this url from response in real world.
      //   getBase64(info.file.originFileObj, imageUrl => {
      //     this.imageUrl = imageUrl;
      //     this.post.image = imageUrl;
      //     this.loading = false;
      //   });
      // }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
.fondo {
  background: white;
  margin-top: 10px;
  border: 1px solid rgb(236, 236, 236);
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
