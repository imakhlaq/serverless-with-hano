import { Context, Hono, Next } from "hono";

const app = new Hono();

//middleware
async function authMiddleware(c: Context, next: Next) {
  if (c.req.header("Authorization")) {
    await next();

    console.log("After the next filter");
  }

  return c.json({ message: "Need Auth" });
}

//adding auth middleware
app.get("/", authMiddleware, async (c) => {
  //how to get the body
  const body = await c.req.json();

  //access the headers
  console.log(c.req.header("Authorization"));

  //query param
  console.log(c.req.query("param"));

  return c.json({
    message: "Hello from Hano",
  });
});

export default app;
