'use server'

import { createClient } from "../../utils/supabase/server-client"
import { logInSchema } from "./schema"
import z from "zod"

export const LogIn = async(userData:z.infer<typeof logInSchema>) => {
    const parsedData = logInSchema.safeParse(userData)
    if(!parsedData.success){
        return { error: "Please check your email and password." }
    }

    const supabase = await createClient()
    const {error} = await supabase.auth.signInWithPassword(parsedData.data)
    
    if(error) return { error: error.message || "Please check your credentials and try again." }

    return { redirectTo: "/" }
}
