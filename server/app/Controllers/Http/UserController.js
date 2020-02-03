"use strict";
const User = use("App/Models/User");

const Database = use("Database");

class UserController {
  async register({ request }) {
    const { username, email, name, lastname, password } = request.all();

    const user = User.create({
      email,
      username,
      password,
      lastname,
      name
    });
    return user;
  }

  async login({ auth, response, request }) {
    try {
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);
      const seachUser = await Database.table("users").where("email", email);
      console.log(seachUser[0].id);
      const user = await User.find(seachUser[0].id);
      let usuario = { user, token };

      return usuario;
    } catch (error) {
      response.send(error.message);
    }
  }
  async users({ auth, response, request }) {
    const { id } = request.all();
    const user = User.find(id);
    return user;
  }
}

module.exports = UserController;
