import Link from "next/link"
import SignUpForm from "./SignupForm"

const SignUp = () => {
     return(
        <div className="border-1 rounded-xl  p-4  w-[500px] mx-auto ">
        <h4> Sign Up?</h4>
        <SignUpForm/>
        <div>
                Already have an account ? <Link className="text-red-500" href="/auth/login">Login </Link>
        </div>
        </div>
    )
}


export default SignUp