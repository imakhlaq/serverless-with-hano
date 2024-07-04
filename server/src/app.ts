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

  public start() {}
}
export default App;
