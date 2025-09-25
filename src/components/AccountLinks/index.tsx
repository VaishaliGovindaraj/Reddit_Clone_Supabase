import Link from "next/link"
import { createClient } from "../../../utils/supabase/server-client"

const AccountLinks =async () => {

    const supabase = await createClient()
    const {data:{user},error} = await supabase.auth.getUser()

    return(
        <div>
            {user 
            ? <p>Log Out </p>
            : <Link href="/auth/login" className="button-secondary">Log In</Link>}
        </div>
    )
}

export default AccountLinks