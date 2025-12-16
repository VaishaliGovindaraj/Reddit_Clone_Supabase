import { createClient as createServerClient } from "./server-client"
import { createClient as createBrowserClient } from "./browserclient"
import {type QueryData } from "@supabase/supabase-js"

export const  getHomePosts = async (supabase: Awaited<ReturnType<typeof createServerClient>> | ReturnType<typeof createBrowserClient>) => { 
  //const supabase = createClient()
  return await supabase.from('posts')
                    .select('id,title,slug,users("username"),image')
                    .order('created_at',{ascending:false})
}

export const getSinglePost = async (slug : string) => {
  const supabase = await createServerClient()
  return await supabase.from('posts')
                        .select('id,title,content,slug,user_id,users("username"),image,comments("comment_section","commentor_name","slug","user_id",id)')
                        .eq('slug',slug)
                        .single()
}

export const getSearchPost = async (searchTerm : string) => {
  const supabase = await createServerClient()
  return await supabase.from('posts')
                        .select('title,slug')
                        .ilike('title',`${searchTerm}%`)
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>
// export type CommentType = QueryData<ReturnType<typeof getSinglePost>>