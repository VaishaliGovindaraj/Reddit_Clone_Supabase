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
    const parsedData = signUpSchema.safeParse(userdata)
    if(!parsedData.success){
        return { error: "Please check the signup form and try again." }
    }

    const supabase = await createClient()

    const {data: existingUsers, error: existingUserError} = await supabase
        .from("users")
        .select("email,username")

    if(existingUserError) return { error: "Unable to check existing accounts. Please try again." }

    const hasExistingAccount = existingUsers?.some((existingUser) => {
        return isSameOrSimilarValue(existingUser.username, parsedData.data.username) ||
            isSameOrSimilarEmail(existingUser.email, parsedData.data.email)
    })

    if(hasExistingAccount) return { error: duplicateAccountMessage }

    const {data:{user},error} = await supabase.auth.signUp({
        email: parsedData.data.email,
        password: parsedData.data.password,
    })

    if(error){
        return { error: isDuplicateAccountError(error.message) ? duplicateAccountMessage : error.message }
    }

    if(user && user.email){
        const {error: profileError} = await supabase.from('users').insert([{id: user.id,email: user.email,username: parsedData.data.username}])
        if(profileError?.code === "23505") return { error: duplicateAccountMessage }
        if(profileError) return { error: profileError.message || "Unable to create account. Please try again." }
    }

    return { redirectTo: "/" }

}
