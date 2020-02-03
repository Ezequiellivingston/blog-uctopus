"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Comment extends Model {
  post() {
    return this.belongsTo("App/Models/Post");
  }

  user() {
    return "Falta";
  }
}

module.exports = Comment;
