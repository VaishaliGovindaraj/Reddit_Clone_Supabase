'use server'
import { createClient } from "../../utils/supabase/server-client"
import { commentSchema } from "../actions/schema"
import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"

export const CreateComment = async ({
  comment_section,
  slug,
  id
}: {
  comment_section: string,
  id: number,
  slug: string
}) => {
  try {
    const parsedData = commentSchema.parse({ comment_section })

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Not Authorized")

    // ✅ FIX: Only fetch profile for current user
    const { data: profile } = await supabase
      .from("users")
      .select("username,id")
      .eq("id", user.id) // ✅ IMPORTANT FIX
      .single()

    await supabase
      .from("comments")
      .insert([
        {
          slug,comment_section: parsedData.comment_section,commentor_name: profile?.username || "Anonymous",user_id: profile?.id||"Anonymous" // ✅ Will now be a real UUID
        }
      ])
      .throwOnError()

    revalidatePath(`/${slug}`)
  } catch (err) {
    console.error("🔥 ERROR IN CreateComment:", err)
    throw err
  }
}