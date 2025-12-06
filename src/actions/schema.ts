import { title } from "process";
import z from "zod";

export const logInSchema = z.object({
    email: z.email(),
    password: z.string().min(6,"Your password must be a minimum of 6 characters")
})

export const signUpSchema = z.object({
    email:z.email(),
    username:z.string().regex(/^[a-zA-Z]+$/,"Username should contain only Letters"),
    password:z.string().min(6,"Password must be minimum of 6 characters")

})

export const postSchema = z.object({
    title:z.string().min(3,"Title must have 3 characters"),
    content:z.string().optional(),
    image:z.instanceof(FormData).optional(),
   
})

export const commentSchema = z.object({
  comment_section: z.string().min(1, "Comment cannot be empty"),
})