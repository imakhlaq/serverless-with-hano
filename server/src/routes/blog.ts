import { Hono } from "hono";
import { Env, Variables } from "../index";
import BlogService from "../services/blog";
import getDB from "../db/db";
import { blog } from "../db/models";

const blogController = new Hono<{
  //env types
  Bindings: Env;
  //jwt payload
  Variables: Variables;
}>();

const blogService = new BlogService();

blogController.post("/add-blog", (c) => {});
blogController.put("/update-blog", (c) => {});
blogController.get("/:id", function (c) {
  const payload = c.get("jwtPayload");
  return c.json(payload, 200);
});

export default blogController;
