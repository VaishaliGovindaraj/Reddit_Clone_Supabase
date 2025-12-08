'use client'

import { LogIn } from "@/actions/log-in"
import { useForm } from "react-hook-form"
import { zodResolver  } from "@hookform/resolvers/zod"
import { logInSchema } from "@/actions/schema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const LogInForm = () => {

    const {register,
        handleSubmit,
        formState:{errors}} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate,isPending, error} = useMutation({
        mutationFn : LogIn,
        onSuccess: () => {
            toast.success("Welcome back! You're now logged in.", {
                description: "Redirecting to homepage...",
            })
        },
        onError: (error) => {
            toast.error("Login failed", {
                description: error.message || "Please check your credentials and try again.",
            })
        }
    })

    return(
        <div className="form-container fade-in">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Welcome Back
            </h2>

            <form onSubmit={handleSubmit(values => mutate(values))} className="space-y-6">
                <div>
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        className={errors.email ? "input-field-error" : "input-field"}
                        {...register("email")}
                        placeholder="you@example.com"
                        disabled={isPending}
                    />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className={errors.password ? "input-field-error" : "input-field"}
                        {...register("password")}
                        placeholder="Enter your password"
                        disabled={isPending}
                    />
                    {errors.password && <p className="form-error">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="button-primary w-full"
                    disabled={isPending}
                >
                    {isPending ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="loading-spinner w-5 h-5"></span>
                            Logging you in...
                        </span>
                    ) : "Log In"}
                </button>
            </form>
        </div>
    )
}

export default LogInForm