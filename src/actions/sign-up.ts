'use server'

import { createClient } from "../../utils/supabase/server-client"
import { signUpSchema } from "./schema"
import z from "zod"

const duplicateAccountMessage = "An account with this email or username already exists."
const similarValueMinimumLength = 6
const isDuplicateAccountError = (message?: string) => {
    const lowerMessage = message?.toLowerCase() || ""
    return lowerMessage.includes("already") || lowerMessage.includes("exists") || lowerMessage.includes("registered")
}

const normalizeValue = (value: string) => value.trim().toLowerCase()

const isSameOrSimilarValue = (firstValue: string, secondValue: string) => {
    const first = normalizeValue(firstValue)
    const second = normalizeValue(secondValue)
    const shortestLength = Math.min(first.length, second.length)

    return first === second || (
        shortestLength >= similarValueMinimumLength &&
        (first.startsWith(second) || second.startsWith(first))
    )
}

const getEmailParts = (email: string) => {
    const [localPart, domain] = normalizeValue(email).split("@")

    return {
        localPart,
        domain
    }
}

const isSameOrSimilarEmail = (firstEmail: string, secondEmail: string) => {
    const first = getEmailParts(firstEmail)
    const second = getEmailParts(secondEmail)

    if(!first.localPart || !first.domain || !second.localPart || !second.domain){
        return false
    }

    return first.domain === second.domain && isSameOrSimilarValue(first.localPart, second.localPart)
}

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
    const parsedData = signUpSchema.parse(userdata)
    const supabase = await createClient()

    const {data: existingUsers, error: existingUserError} = await supabase
        .from("users")
        .select("email,username")

    if(existingUserError) throw existingUserError

    const hasExistingAccount = existingUsers?.some((existingUser) => {
        return isSameOrSimilarValue(existingUser.username, parsedData.username) ||
            isSameOrSimilarEmail(existingUser.email, parsedData.email)
    })

    if(hasExistingAccount) throw new Error(duplicateAccountMessage)

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
