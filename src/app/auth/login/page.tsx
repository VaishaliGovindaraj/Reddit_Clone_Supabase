import Link from "next/link"
import LogInForm from "./LoginForm"

const LogIn = () => {
    return(
        <div className="w-full max-w-xl mx-auto px-3 py-5 sm:px-6">
        <h4 className="mb-4 text-center text-xl font-semibold"> Log In?</h4>
        <LogInForm />
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Dont have an account ?SignUp <Link className="text-red-500" href="/auth/signup">SignUp</Link>
        </div>
        </div>
    )
}

export default LogIn
