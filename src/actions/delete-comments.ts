// actions/delete-comment.ts
'use server'
import { createClient } from "../../utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const deleteComment = async (commentId: number, slug: string) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authorized")

  await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .throwOnError()
  revalidatePath(`/${slug}`)
}