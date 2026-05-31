'use server'
import z from "zod";
import { postSchema } from "./schema";
import { createClient } from "../../utils/supabase/server-client";
import { slugify } from "../../utils/slugify";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../../utils/supabase/upload-image";

export const EditPost =async ({postId,userdata}:{postId:number,userdata:z.infer<typeof postSchema>}) => {
    const parsedData = postSchema.safeParse(userdata)
    if(!parsedData.success){
        return { error: "Please check the post form and try again." }
    }
    
    const imageFile = userdata.image?.get("image")

    let publicImageUrl: string | undefined

    if(typeof imageFile !== 'string' && imageFile !== undefined) {
        if(!(imageFile instanceof File) && imageFile !== null) {
            return { error: "Please upload a valid image file." }
        }
        if(imageFile instanceof File){
            try {
                publicImageUrl = await uploadImage(imageFile)
            } catch {
                return { error: "Unable to upload image. Please try again." }
            }
        }
        }else {
            publicImageUrl = imageFile
        }
       
    const supabase = await createClient()
    const {data: {user}, error: userError} = await supabase.auth.getUser()
    
    const {data: post,error} = await supabase.from('posts')
                                                .select('*')
                                                .eq('id',postId)
                                                .single()

    if(error){
        return { error: "Unable to find this post." }
    }

    if(userError || !user || user.id !== post?.user_id) {
        return { error: "You are not allowed to edit this post." }
    }

    const updatePayload = {
        title: parsedData.data.title,
        content: parsedData.data.content,
        slug: slugify(parsedData.data.title),
        ...(publicImageUrl !== undefined ? { image: publicImageUrl } : {})
    }
    
    const {data:updatedPost, error: updateError} = await supabase.from('posts')
                                            .update(updatePayload)
                                            .eq('id',postId)
                                            .select('slug')
                                            .single()

    if(updateError || !updatedPost){
        return { error: updateError?.code === "23505" ? "A post with this title already exists." : "Unable to update post. Please try again." }
    }

    revalidatePath("/")
    return { redirectTo: `/${updatedPost.slug}` }

}

