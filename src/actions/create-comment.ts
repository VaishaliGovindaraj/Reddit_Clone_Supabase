'use server'

import { createClient } from "../../utils/supabase/server-client"
import { commentSchema } from "../actions/schema"
import { revalidatePath } from "next/cache"

export const CreateComment = async ({
  comment_section,
  slug,
  id
}: {
  comment_section: string,
  id: number,
  slug: string
}) => {
  const parsedData = commentSchema.safeParse({ comment_section })
  if(!parsedData.success){
    return { error: "Please enter a comment before posting." }
  }

  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) return { error: "Please log in before commenting." }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("username,id")
    .eq("id", user.id)
    .single()

  if(profileError || !profile) return { error: "Unable to find your user profile." }

  const { error } = await supabase
    .from("comments")
    .insert([
      {
        slug,
        comment_section: parsedData.data.comment_section,
        commentor_name: profile.username,
        user_id: profile.id
      }
    ])

  if(error) return { error: "Unable to add comment. Please try again." }

  revalidatePath(`/${slug}`)
  return { success: true }
}
