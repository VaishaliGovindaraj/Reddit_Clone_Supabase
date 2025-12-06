import Link from "next/link"
import { createClient } from "../../../utils/supabase/server-client"

import LogOutButton from "../LogOut"

const AccountLinks =async () => {

    const supabase = await createClient()
    const {data:{user},error} = await supabase.auth.getUser()

    return(
        <div>
            {user 
            ? 
            <div className="flex items-center m-2">
            <Link href="/create" className="button-tertiary m-2">Create Post</Link>
            <LogOutButton />
            </div>
            : 
            <Link href="/auth/login" className="button-secondary">Log In</Link>}
        </div>
    )
}

export default AccountLinks