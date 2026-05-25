'use server'

import { createClient } from "../../utils/supabase/server-client"
import { logInSchema } from "./schema"
import z from "zod"

export const LogIn = async(userData:z.infer<typeof logInSchema>) => {
  

    
    const parsedData = logInSchema.parse(userData)

    const supabase = await createClient()
    const {error} = await supabase.auth.signInWithPassword(parsedData)
    
    if(error) throw error

    return { redirectTo: "/" }
}
