import { Hono } from "hono";
import { authValid } from "../utils/validation/auth";
import { Env } from "../index";
import AuthService from "../services/auth";

const authController = new Hono<{
  //env types
  Bindings: Env;
}>();

const authService = new AuthService();

authController.post("/signup", async function (c) {
  const body = await c.req.json();
  const signupDTO = authValid.parse(body);
  const { DATABASE_URL, JWT_SECRET } = c.env;

  const jwtToken = await authService.signup(
    signupDTO,
    DATABASE_URL,
    JWT_SECRET,
  );

  return c.json({ username: signupDTO.username, jwtToken });
});

authController.post("/signing", async function (c) {
  const body = await c.req.json();
  const signingDTO = authValid.parse(body);
  const { DATABASE_URL, JWT_SECRET } = c.env;

  const jwtToken = await authService.signing(
    signingDTO,
    DATABASE_URL,
    JWT_SECRET,
  );

  return c.json({ username: signingDTO.username, jwtToken });
});

export default authController;
