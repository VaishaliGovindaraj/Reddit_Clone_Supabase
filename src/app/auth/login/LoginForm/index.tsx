'use client'

import { LogIn } from "@/actions/log-in"
import { useForm } from "react-hook-form"
import { zodResolver  } from "@hookform/resolvers/zod"
import { logInSchema } from "@/actions/schema"
import ErrorMessage from "@/components/ErrorComponent"
import { useMutation } from "@tanstack/react-query"

const LogInForm = () => {

    const {register,
        handleSubmit,
        formState:{errors}} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate,isPending, error} = useMutation({
        mutationFn : LogIn,
      
    })

    return(
        <>
        <form onSubmit={handleSubmit(values => mutate(values))}  className="flex flex-col m-auto">
         
            <fieldset className="m-2">
                <label htmlFor="email">Enter your email</label>
                <input id="email" className="ml-2 bg-gray-300 rounded-2xl p-2 " {...register("email")}  placeholder="enter your email id"/>
                {errors.email  && <ErrorMessage message={errors.email.message!} />}
            </fieldset>

              <fieldset>
                <label htmlFor="password">Enter your password</label>
                <input id="password" type="password" {...register("password")} className="ml-2  bg-gray-300 rounded-2xl p-2 " placeholder="enter your password id"/>
                {errors.password  && <ErrorMessage message={errors.password.message!} />}
            </fieldset>

            <button className="button-secondary w-1/4">{isPending ? "Logging you In!" : "Log In"}</button>
        </form>
        {error && <p>{error.message}</p>}
        
        </>
    )
}

export default LogInForm