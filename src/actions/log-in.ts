'use server'

import { redirect } from "next/navigation"
import { createClient } from "../../utils/supabase/server-client"
import { logInSchema } from "./schema"
import z from "zod"

export const LogIn = async(userData:z.infer<typeof logInSchema>) => {
  

    
    const parsedData = logInSchema.parse(userData)

    const supabase = await createClient()
    const {data:{user},error} = await supabase.auth.signInWithPassword(userData)
    
    if(error) throw error

    redirect("/")
}