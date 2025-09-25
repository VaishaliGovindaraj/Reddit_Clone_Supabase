'use server'

import { redirect } from "next/navigation"
import { createClient } from "../../utils/supabase/server-client"



export const SignUp = async (formdata: FormData) => {
    const userdata = {
        email: formdata.get("email") as string,
        username: formdata.get("username") as string,
        password: formdata.get("password") as string
    }

    const supabase = await createClient()

    const {data:{user},error} = await supabase.auth.signUp(userdata)
    console.log("User: ",user," Error: ",error)

    if(user && user.email){
        const {data,error} = await supabase.from('users').insert([{id: user.id,email: user.email,username: userdata.username}])
        console.log("User registered now:", data)

    }
        if(error) throw error
        redirect("/")

}
