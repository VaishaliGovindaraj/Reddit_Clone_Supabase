'use server'

import { createClient } from "../../utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const deleteComment = async (commentId: number, slug: string) => {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) return { error: "Please log in before deleting a comment." }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)

  if(error) return { error: "Unable to delete comment. Please try again." }

  revalidatePath(`/${slug}`)
  return { success: true }
}
