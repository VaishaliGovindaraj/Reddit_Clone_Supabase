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
            <div>
                <button className="button-tertiary" onClick={handleLogOut}>Log Out</button>
            </div>
        )

}

export default LogOutButton