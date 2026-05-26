'use server'

import { createClient } from "../../utils/supabase/server-client"
import { signUpSchema } from "./schema"
import z from "zod"

const duplicateAccountMessage = "An account with this email or username already exists."
const isDuplicateAccountError = (message?: string) => {
    const lowerMessage = message?.toLowerCase() || ""
    return lowerMessage.includes("already") || lowerMessage.includes("exists") || lowerMessage.includes("registered")
}

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
    const parsedData = signUpSchema.parse(userdata)
    const supabase = await createClient()

    const {data: existingUsers, error: existingUserError} = await supabase
        .from("users")
        .select("id")
        .or(`email.eq.${parsedData.email},username.ilike.${parsedData.username}`)
        .limit(1)

    if(existingUserError) throw existingUserError
    if(existingUsers?.length) throw new Error(duplicateAccountMessage)

    const {data:{user},error} = await supabase.auth.signUp({
        email: parsedData.email,
        password: parsedData.password,
    })

    if(error) throw new Error(isDuplicateAccountError(error.message) ? duplicateAccountMessage : error.message)

    if(user && user.email){
        const {error: profileError} = await supabase.from('users').insert([{id: user.id,email: user.email,username: parsedData.username}])
        if(profileError?.code === "23505") throw new Error(duplicateAccountMessage)
        if(profileError) throw profileError
    }

    return { redirectTo: "/" }

}
