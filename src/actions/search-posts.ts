"use server"

import { createClient } from "../../utils/supabase/server-client"

export const searchPosts = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === '') {
        return { data: [], error: null }
    }

    const supabase = await createClient()
    const { data, error } = await supabase
        .from('posts')
        .select('title,slug')
        .ilike('title', `${searchTerm}%`)

    return { data, error }
}
