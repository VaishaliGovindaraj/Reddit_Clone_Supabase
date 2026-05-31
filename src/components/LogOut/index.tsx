'use client'

import { LogOut } from "@/actions/log-out"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const LogOutButton =  () => {
        const router = useRouter()

        const handleLogOut = async () => {
            try {
                const result = await LogOut()
                if (result.error) {
                    toast.error("Logout failed", {
                        description: result.error
                    })
                    return
                }

                if (!result.redirectTo) {
                    toast.error("Logout failed", {
                        description: "Please try again"
                    })
                    return
                }

                toast.success("Logged out successfully", {
                    description: "Come back soon!"
                })
                router.push(result.redirectTo)
                router.refresh()
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
