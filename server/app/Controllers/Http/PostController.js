"use strict";

const Post = use("App/Models/Post");
const Like = use("App/Models/Like");
const Point = use("App/Models/Point");
const { validate } = use("Validator");
const Database = use("Database");
const base64ToImage = require("base64-to-image");
const moment = require("moment");
const Helpers = use("Helpers");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let { page } = request.all();

    page = page || 1;
    let offset = (page - 1) * 20;
    let posts = await Database.raw(`
      SELECT 
        *,
          (select count(*) from octopus.likes as l where l.post_id = p.id) as likes,
          (select count(*) from octopus.points as l where l.post_id = p.id) as points
      FROM octopus.posts as p
      ORDER BY p.created_at DESC
      LIMIT 20
      OFFSET ${offset};
    `);

    if (posts[0]) {
      posts = posts[0];
    } else {
      posts = [];
    }
    return posts;
  }

  async likes({ request, response, auth, params: { id } }) {
    const user = await auth.getUser();
    const likesByUser = await Like.query()
      .where("user_id", user.id)
      .where("post_id", id)
      .getCount();
    let message = "";

    if (likesByUser === 0) {
      await Like.create({
        user_id: user.id,
        post_id: id
      });
      message = "Nuevo Like";
    } else {
      await Database.table("likes")
        .where("user_id", user.id)
        .where("post_id", id)
        .delete();
      message = "Like removido";
    }

    return {
      status: "OK",
      message
    };
  }

  async points({ request, response, auth, params: { id } }) {
    const user = await auth.getUser();
    const pointsByUser = await Point.query()
      .where("user_id", user.id)
      .where("post_id", id)
      .getCount();
    let message = `Puntos en este post ${pointsByUser}`;

    if (pointsByUser < 10) {
      await Point.create({
        user_id: user.id,
        post_id: id
      });
      message = `Puntos en este post ${pointsByUser + 1}`;
    }

    return {
      status: "OK",
      message
    };
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { title, body, image } = request.all();
    const user = await auth.getUser();

    const path = Helpers.publicPath() + "/images/";
    const nameImage = `${moment().format("YYYYMMDDHHmmss")}-${user.id}`;
    const optionalObj = {
      fileName: nameImage,
      type: "jpg"
    };
    base64ToImage(image, path, optionalObj);

    const rules = {
      title: "required",
      body: "required"
    };

    const validation = await validate({ title, body, nameImage }, rules);

    if (validation.fails()) {
      return {
        status: "error",
        message: "Uno o mas campo son requerido"
      };
    }

    const post = await Post.create({
      title,
      body,
      image: `http://localhost:3333/images/${nameImage}.jpg`,
      user_id: user.id
    });

    return post;
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response, view }) {
    const post = await Post.find(id);
    console.log(post);
    return post;
  }

  async postUser({ request, response, auth }) {
    const user = await auth.getUser();

    const post = await Database.table("posts").where("user_id", user.id);

    return post;
  }
  async noApproved({ params, request, response, auth }) {
    const post = await Database.table("posts").where("approved", 0);

    return post;
  }
  async approved({ params, request, response, auth }) {
    const post = await this.index(...arguments);
    console.log;
    let postAppoved = [];
    post.forEach(element => {
      if (element.approved == 1) {
        postAppoved.push(element);
      }
    });
    return postAppoved;
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async update({ params, request, response, view, auth }) {
    const user = await auth.getUser();
    const { title, body, image, approved } = request.all();
    const edit = await Post.find(params.id);
    console.log(edit);
    edit.title = title;
    edit.body = body;
    edit.image = image;
    edit.approved = approved;
    if (user.id == 1) {
      await edit.save();
      return {
        status: "Edit",
        message: "Post editado correctamente"
      };
    }
    if (edit.user_id !== user.id) {
      return {
        status: "error",
        message: "No tienes permisos para eliminar este post"
      };
    }

    await edit.save();
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    const user = await auth.getUser();
    const post = await Post.find(params.id);

    if (user.id == 1) {
      await post.delete();
      return {
        status: "Eliminado",
        message: "Post eliminado correctamente"
      };
    }
    if (post.user_id !== user.id) {
      return {
        status: "error",
        message: "No tienes permisos para eliminar este post"
      };
    }

    post.delete();
    return post;
  }
}

module.exports = PostController;
