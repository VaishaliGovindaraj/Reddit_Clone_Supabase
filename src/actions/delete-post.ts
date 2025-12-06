'use server'
import { createClient } from "../../utils/supabase/server-client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const DeletePost = async (postId : number) => {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authorized")

    // Fetch the post to get the image URL
    const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("image")
        .eq('id', postId)
        .single()

    if (fetchError) throw fetchError

    // Delete image from storage if exists
    if (post?.image) {
        const urlParts = post.image.split('/images/')
        if (urlParts.length > 1) {
            await supabase.storage.from('images').remove([urlParts[1]])
        }
    }

    // Delete the post - comments will be auto-deleted by CASCADE
    await supabase
        .from("posts")
        .delete()
        .eq('id', postId)
        .throwOnError()
        
    revalidatePath("/")
    redirect("/")
}