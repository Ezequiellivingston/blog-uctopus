"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/api/v1/registro", "UserController.register");
Route.post("/api/v1/login", "UserController.login");
Route.get("/api/v1/user", "UserController.users");

Route.get("/api/v1/posts", "PostController.index");
Route.get("/api/v1/posts/:id", "PostController.show");
Route.get("/api/v1/postsUsers", "PostController.postUser");
Route.get("/api/v1/postsNoApproved", "PostController.noApproved");
Route.get("/api/v1/postsApproved", "PostController.approved");

Route.post("/api/v1/comment/:id", "CommentController.create");
Route.get("/api/v1/comment/:id", "CommentController.index");

Route.group(() => {
  Route.post("/api/v1/posts", "PostController.store");
  Route.put("/api/v1/posts/:id", "PostController.update");
  Route.delete("/api/v1/posts/:id", "PostController.destroy");
  Route.post("/api/v1/posts/:id/likes", "PostController.likes");
  Route.post("/api/v1/posts/:id/points", "PostController.points");
}).middleware(["auth"]);

Route.group(() => {
  Route.post("/api/v1/posts", "PostController.approved");
}).middleware(["auth", "admin"]);

Route.group(() => {
  Route.get("/api/v1/like/:id", "LikeController.index");
  Route.put("/api/v1/like/:id", "LikeController.update");
}).middleware(["auth"]);
