'use client'

import { LogOut } from "@/actions/log-out"
import { toast } from "sonner"


const LogOutButton =  () => {

        const handleLogOut = async () => {
            try {
                await LogOut()
                toast.success("Logged out successfully", {
                    description: "Come back soon!"
                })
            } catch (error) {
                toast.error("Logout failed", {
                    description: "Please try again"
                })
            }
        }

        return(
            <div className="flex-1 sm:flex-none">
                <button className="button-tertiary w-full sm:w-auto" onClick={handleLogOut}>Log Out</button>
            </div>
        )

}

export default LogOutButton
