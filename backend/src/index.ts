import user from "./routes/user";
import { Environment } from "./common/utils";
import blog from "./routes/blog";
import { Hono } from "hono";
import { cors } from 'hono/cors'
const app = new Hono<Environment>();

const apiVersion1 = app.basePath("api/v1");
app.use("/*", cors())
apiVersion1.route("/user", user);

apiVersion1.route("/blog", blog);

/**
 * default path at end
 */
apiVersion1.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
