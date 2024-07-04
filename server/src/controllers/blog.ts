import { Hono } from "hono";
import { Env, Variables } from "../index";
import BlogService from "../services/blog";

const blogController = new Hono<{
  //env types
  Bindings: Env;
  //jwt payload
  Variables: Variables;
}>();

const blogService = new BlogService();

blogController.post("/api/v1/blog");
blogController.put("/api/v1/blog");
blogController.get("/api/v1/blog/:id", function (c) {
  const payload = c.get("jwtPayload");
  return c.json(payload, 200);
});

export default blogController;
