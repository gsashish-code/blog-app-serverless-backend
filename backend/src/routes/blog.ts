import { verify } from "hono/jwt";
import { Environment } from "../common/utils";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput } from "@gsashish/medium-common";
import { PrismaClient } from "@prisma/client/edge";

const blog = new Hono<Environment>();

blog.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const _token = c.req.header("Authorization") || "";
  const token = _token?.split(" ")[1];

  try {
    // verify header
    const response = await verify(token, c.env.JWT_SECRET);
    console.log({ _token, token, response })
    if (response.id) {
      const user = await prisma.user.findUnique({
        where: {
          id: response?.id || "",
        },
      });

      if (user) {
        c.set("userId", user.id);
        await next();
      } else {
        c.status(403);
        return c.json("not authorised");
      }
    } else {
      c.status(403);
      return c.json("not authorised");
    }
  } catch (e) {
    c.status(403);
    return c.json("not authorised");
  }
});

blog.post("/", async (c) => {
  const body = await c.req.json();
  const userId = await c.var.userId;

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { success } = createBlogInput.safeParse(body)
    console.log({ userId, blog })
    if (success) {
      const blog = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: userId,
        },
      });

      return c.json({
        id: blog.id,
      });
    } else {
      c.status(403);
      return c.json("Internal server error");
    }
  } catch (error) {
    c.status(403);
    return c.json("Internal server error");
  }
});
blog.get("/bulk", async (c) => {
  const userId = await c.req.query("userId");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany(
      userId ? {
        where: { authorId: userId, }, select: {
          content: true, title: true, id: true, createdAt: true, updatedAt: true, author: {
            select: {
              name: true
            }
          }
        }
      } : {
        select: {
          content: true, title: true, id: true, createdAt: true, updatedAt: true, author: {
            select: {
              name: true
            }
          }
        }
      }
    );

    return c.json({
      blogs,
    });
  } catch (error) {
    console.log("error", error);
    c.status(403);
    return c.json("Internal server error");
  }
});
blog.put("/:id", async (c) => {
  const blogId = await c.req.param("id");
  const body = await c.req.json();
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.update({
      where: {
        id: blogId,
      },
      data: { title: body.title, content: body.content },
    });
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    c.status(403);
    return c.json("Internal server error");
  }
});

blog.get("/:id", async (c) => {
  const blogId = await c.req.param("id");
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
      select: {
        content: true, title: true, id: true, createdAt: true, updatedAt: true, author: {
          select: {
            name: true
          }
        }
      }
    });
    console.log(blog)
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(403);
    return c.json("Internal server error");
  }
});

export default blog;
