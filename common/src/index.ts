import { z } from "zod";


export const signUpInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signInInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export type UpdateBlog = z.infer<typeof updateBlogInput>
export type SignIn = z.infer<typeof signInInput>;
export type CreateBlog = z.infer<typeof createBlogInput>;
export type SignUp = z.infer<typeof signUpInput>;