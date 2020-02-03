"use strict";

const Like = use("App/Models/Like");
const Post = use("App/Models/Post");

const User = use("App/Models/User");
const Database = use("Database");

const { validate } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with likes
 */
class LikeController {
  /**
   * Show a list of all likes.
   * GET likes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, auth }) {
    const postId = params.id;
    const likes = await Database.table("likes").where("post_id", postId);
    likes.forEach(element => {
      console.log(element.user_id);
    });

    return likes;
  }

  /**
   * Create/save a new like.
   * POST likes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params }) {
    const user = await auth.getUser();
    const postId = params.id;
    const edit = await Post.find(postId);
    const verificador = await Database.table("likes").where("user_id", user.id);

    if (verificador.length >= 1) {
      edit.like--;
      edit.save();
      await Database.table("likes")
        .where("user_id", user.id)
        .delete();
      return;
    } //
    const like = await Like.create({
      user_id: user.id,
      post_id: postId
    });
    console.log(edit);
    edit.like++;
    edit.save();
    return like;
  }
}

module.exports = LikeController;
