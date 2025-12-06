'use client'

import { LogOut } from "@/actions/log-out"


const LogOutButton =  () => {
        
        const handleLogOut = () => {    
            LogOut()
        }
        
        return(
            <div>
                <button className="button-tertiary" onClick={handleLogOut} >LogOut</button>
            </div>
        )

}

export default LogOutButton