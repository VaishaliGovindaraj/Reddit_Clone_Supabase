'use server'

import { slugify } from "../../utils/slugify";
import { createClient } from "../../utils/supabase/server-client";
import { postSchema } from "./schema"
import { z } from "zod"
import { revalidatePath } from "next/cache";
import { uploadImage } from "../../utils/supabase/upload-image";

export const CreatePost = async (userdata:z.infer<typeof postSchema>) => {
    const parsedData = postSchema.safeParse(userdata)
    if(!parsedData.success){
        return { error: "Please check the post form and try again." }
    }

    const slug = slugify(parsedData.data.title)
  
    const imageFile = userdata.image?.get("image")

    if(!(imageFile instanceof File) && imageFile !== null) {
        return { error: "Please upload a valid image file." }
    }
    
    let publicImageUrl = null
    if(imageFile instanceof File){
        try {
            publicImageUrl = await uploadImage(imageFile)
        } catch {
            return { error: "Unable to upload image. Please try again." }
        }
    }

    const supabase = await createClient()
    const {data:{user}, error: userError} = await supabase.auth.getUser();
    

    if(userError || !user) {
        return { error: "Please log in before creating a post." }
    }
   
    const userId = user.id;

    const {error} = await supabase.from('posts')
                .insert([{user_id:userId,slug:slug,title:parsedData.data.title,content:parsedData.data.content,image:publicImageUrl}])

    if(error){
        return { error: error.code === "23505" ? "A post with this title already exists." : "Unable to create post. Please try again." }
    }

    revalidatePath("/")
    return { redirectTo: `/${slug}` }
    }
