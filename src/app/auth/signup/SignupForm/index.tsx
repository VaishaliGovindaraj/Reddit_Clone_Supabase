'use client'

import { signUpSchema } from "@/actions/schema"
import { SignUp } from "@/actions/sign-up"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const SignUpForm = () => {
    const { register,
        handleSubmit,
        formState: { errors }
            } = useForm({
                resolver :zodResolver(signUpSchema)
    })


    const {mutate, isPending} = useMutation({
        mutationFn : SignUp,
        onSuccess: () => {
            toast.success("Account created successfully!", {
                description: "Welcome! Redirecting to your feed...",
            })
        },
        onError: (error) => {
            toast.error("Signup failed", {
                description: error.message || "Unable to create account. Please try again.",
            })
        }
    })

    return (
        <div className="form-container fade-in">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Create Account
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
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        id="username"
                        type="text"
                        className={errors.username ? "input-field-error" : "input-field"}
                        {...register("username")}
                        placeholder="Choose a username"
                        disabled={isPending}
                    />
                    {errors.username && <p className="form-error">{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className={errors.password ? "input-field-error" : "input-field"}
                        {...register("password")}
                        placeholder="Create a strong password"
                        disabled={isPending}
                    />
                    {errors.password && <p className="form-error">{errors.password.message}</p>}
                    <p className="form-helper">Must be at least 8 characters long</p>
                </div>

                <button
                    type="submit"
                    className="button-primary w-full"
                    disabled={isPending}
                >
                    {isPending ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="loading-spinner w-5 h-5"></span>
                            Creating your account...
                        </span>
                    ) : "Sign Up"}
                </button>
            </form>
        </div>
    )
}

export default SignUpForm
