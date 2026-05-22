import Link from "next/link"
import SignUpForm from "./SignupForm"

const SignUp = () => {
     return(
        <div className="w-full max-w-xl mx-auto px-3 py-5 sm:px-6">
        <h4 className="mb-4 text-center text-xl font-semibold"> Sign Up?</h4>
        <SignUpForm/>
        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account ? <Link className="text-red-500" href="/auth/login">Login </Link>
        </div>
        </div>
    )
}


export default SignUp
