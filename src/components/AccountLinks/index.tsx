import Link from "next/link"
import { createClient } from "../../../utils/supabase/server-client"

import LogOutButton from "../LogOut"

const AccountLinks =async () => {

    const supabase = await createClient()
    const {data:{user},error} = await supabase.auth.getUser()

    return(
        <div className="w-full sm:w-auto">
            {user
            ?
            <div className="flex w-full items-center gap-2 sm:gap-3">
                <Link href="/create" className="button-secondary flex-1 text-center sm:flex-none">Create Post</Link>
                <LogOutButton />
            </div>
            :
            <Link href="/auth/login" className="button-primary inline-flex w-full justify-center sm:w-auto">Log In</Link>}
        </div>
    )
}

export default AccountLinks
