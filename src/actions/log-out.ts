'use server'

import { createClient } from "../../utils/supabase/server-client"




export const LogOut = async () => {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) return { error: "Unable to log out. Please try again." }

    return { redirectTo: "/" }

    // const {data:{user},error} = await supabase.auth.signOut()
}
