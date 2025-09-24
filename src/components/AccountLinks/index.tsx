import Link from "next/link"

const AccountLinks = () => {
    return(
        <div>
            <Link href="/auth/login" className="button-secondary">Log In</Link>
        </div>
    )
}

export default AccountLinks