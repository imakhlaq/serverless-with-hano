import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authValid } from "../utils/validation/auth";

const authController = new Hono<{
  //env types
  Bindings: {
    DATABASE_URL: string;
  };
}>();

authController.post("/signup", async function (c) {
  //passing the db url from env to helper

  const body = await c.req.json();
  const signupDTO = authValid.parse(body);

  return c.json({ message: "Hello" });
});

authController.post("/signing", async function (c) {
  //passing the db url from env to helper class

  return c.json({ message: "Hello" });
});

export default authController;
