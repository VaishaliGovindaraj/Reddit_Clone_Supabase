import { createClient } from "./browserclient"
import { type QueryData } from "@supabase/supabase-js"

export const getPosts = async(supabase:ReturnType<typeof createClient>) => {
// const supabase = createClient()
return await supabase.from('posts').select('id,title,slug,created_at,users("username")').order('created_at',{ascending :false})
}

export const getSinglePost = async (slug: string) => {
    const supabase = createClient()
    return await supabase.from('posts').select('*').eq('slug',slug).single()

}

export const getSearchedPost = async (searchTerm : string) => {
    const supabase = createClient()
    return await supabase.from('posts').select('title,slug').ilike('title',`%${searchTerm}%`)
}

export type HomePostTypes = QueryData<ReturnType<typeof getPosts>>