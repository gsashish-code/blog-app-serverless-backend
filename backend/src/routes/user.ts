import { compare, hash } from "bcryptjs";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { Environment } from "../common/utils";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signUpInput } from "@gsashish/medium-common";
import { PrismaClient } from "@prisma/client/edge";

const user = new Hono<Environment>();

/**
 * paths
 */
// const isMatch = await compare(password, storedHash)
user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success, data } = signUpInput.safeParse(body)
  console.log(success, body, signUpInput.safeParse(body))
  if (!success) {
    c.status(411)
    return c.json({ message: "body sent is not correct" })
  }
  const { password, username, name } = data;
  // hash the password
  const hashedPassword = await hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: username,
        password: hashedPassword,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ messsage: "user created", jwt: token });
  } catch (e) {
    c.status(403);
    return c.json("Internal server error");
  }
});

user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const user = await prisma.user.findUnique({
      where: { email: body.username },
    });
    const isMatchPasswordMatched = await compare(body.password, user.password);
    if (!user || !isMatchPasswordMatched) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ messsage: "Successfully sign in", jwt: jwtToken });
  } catch (e) {
    c.status(403);
    return c.json("Internal server error");
  }
});

export default user;
