'use server'

import { createClient } from "../../utils/supabase/server-client"




export const LogOut = async () => {
    const supabase = await createClient()

    const {data:{user},error} = await supabase.auth.signOut()
}