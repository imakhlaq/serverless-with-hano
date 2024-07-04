import { Hono } from "hono";
import authController from "./controllers/auth";
import blogController from "./controllers/blog";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";

export type Args = {
  port: number;
  contextPath?: string;
};

export type Env = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

class App {
  private readonly port: number;
  private readonly contextPath?: string;

  constructor({ port, contextPath }: Args) {
    this.port = port;
    this.contextPath = contextPath;
  }

  public start() {
    const app = new Hono<{
      //env types
      Bindings: Env;
    }>().basePath(this.contextPath ?? "/api");

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
    app.use("/auth/*", (c, next) => {
      const jwtMiddleware = jwt({
        secret: c.env.JWT_SECRET,
        alg: "HS256",
      });
      return jwtMiddleware(c, next);
    });

    app.route("/v1/auth", authController);
    app.route("/v1/blog", blogController);
  }
}
export default App;
