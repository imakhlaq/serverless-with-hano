import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import authController from "./controllers/auth";
import blogController from "./controllers/blog";
import CustomError from "./errors/custom-error";

export type Env = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};
export type Variables = {
  username: string;
};

const app = new Hono<{
  //env types
  Bindings: Env;
  //jwt payload
  Variables: Variables;
}>().basePath("/api");

// Add X-Response-Time header
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  c.header("X-Response-Time", `${ms}ms`);
});

//register middleware
app.use(
  "/api/*",
  cors({
    origin: "*",
    allowHeaders: ["*"],
    allowMethods: ["*"],
    exposeHeaders: ["*"],
    maxAge: 600,
    credentials: true,
  }),
);

//JWT filter
app.use("/blog/*", (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
    alg: "HS256",
  });
  return jwtMiddleware(c, next);
});

app.route("/v1/auth", authController);
app.route("/v1/blog", blogController);

app.onError((err, c) => {
  if (err instanceof CustomError) {
    // @ts-ignore
    return c.json(err, err.statusCode);
  }
  return c.json({ message: err.message });
});

export default app;
