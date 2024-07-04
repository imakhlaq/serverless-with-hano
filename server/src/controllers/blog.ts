import { Hono } from "hono";

const blogController = new Hono();

blogController.post("/api/v1/blog");
blogController.put("/api/v1/blog");
blogController.get("/api/v1/blog/:id");

export default blogController;
