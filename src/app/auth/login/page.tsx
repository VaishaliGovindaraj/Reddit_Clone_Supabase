import Link from "next/link"
import LogInForm from "./LoginForm"

const LogIn = () => {
    return(
        <div className="border-1 rounded-xl  p-4  w-[500px] mx-auto ">
        <h4> Log In?</h4>
        <LogInForm />
        <div>
                Dont have an account ?SignUp <Link className="text-red-500" href="/auth/signup">SignUp</Link>
        </div>
        </div>
    )
}

export default LogIn