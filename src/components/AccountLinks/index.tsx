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
            <div className="flex items-center gap-3">
                <Link href="/create" className="button-secondary">Create Post</Link>
                <LogOutButton />
            </div>
            :
            <Link href="/auth/login" className="button-primary">Log In</Link>}
        </div>
    )
}

export default AccountLinks