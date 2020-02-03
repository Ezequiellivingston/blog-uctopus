<template>
  <a-layout-sider collapsible v-model="collapsed">
    <div class="users" style="margin-top:10px">
      <a-avatar
        slot="avatar"
        :size="64"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
      <h2 v-if="!collapsed" class="username">{{user.user.name}} {{user.user.lastname}}</h2>
    </div>
    <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
      <a-menu-item
        v-for="(item, index) in tabs"
        :key="index"
        :to="item.to"
        style="
  height: 50px;
  margin-top: 20px;"
      >
        <Nuxt-link v-if="item.admin <= user.user.admin" :to="item.to">
          <a-icon :type="item.icon" />
          <span>{{item.title}}</span>
        </Nuxt-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
      tabs: [
        {
          title: "Mi perfil",
          icon: "home",
          to: "/home",
          admin: 0
        },
        {
          title: "Noticias",
          icon: "team",
          to: "/",
          admin: 0
        },

        {
          title: "admin",
          icon: "team",
          to: "/adminPost",
          admin: 1
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped>
.username {
  color: white;
}
.users {
  text-align: center;
}
</style>