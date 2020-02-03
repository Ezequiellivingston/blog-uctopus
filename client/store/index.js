import axios from "~/plugins/axios";
import Cookie from "js-cookie";

export const state = () => ({
  user: [],
  auth: false
});

export const mutations = {
  SET_LOGIN(state, user) {
    state.user = user;
    state.auth = !state.auth;
  }
};

export const actions = {
  async login(context, { email, password }) {
    try {
      await axios
        .post("login", {
          email,
          password
        })
        .then(res => {
          let datosUsers = res.data;
          Cookie.set("auth", JSON.stringify(datosUsers));
          Cookie.set("token", datosUsers.token.token);
          context.commit("SET_LOGIN", datosUsers);

          this.$router.push("/");
        });
    } catch {}
  }
};
