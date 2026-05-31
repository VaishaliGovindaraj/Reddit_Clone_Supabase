'use server'
import { createClient } from "../../utils/supabase/server-client"
import { revalidatePath } from "next/cache"


export const DeletePost = async (postId : number) => {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) return { error: "Please log in before deleting a post." }

    // Fetch the post to get the image URL
    const { data: post, error: fetchError } = await supabase
        .from("posts")
        .select("image,user_id")
        .eq('id', postId)
        .single()

    if (fetchError || !post) return { error: "Unable to find this post." }
    if (post.user_id !== user.id) return { error: "You are not allowed to delete this post." }

    // Delete image from storage if exists
    if (post?.image) {
        const urlParts = post.image.split('/images/')
        if (urlParts.length > 1) {
            await supabase.storage.from('images').remove([urlParts[1]])
        }
    }

    // Delete the post - comments will be auto-deleted by CASCADE
    const { error } = await supabase
        .from("posts")
        .delete()
        .eq('id', postId)
    if(error) return { error: "Unable to delete post. Please try again." }
        
    revalidatePath("/")
    return { redirectTo: "/" }
}
