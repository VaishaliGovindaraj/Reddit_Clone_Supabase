import Link from "next/link"

const Logo = () => {
    return(
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl hover:opacity-80 transition-opacity">
            <span className="text-4xl">🔥</span>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Reddit Clone
            </span>
        </Link>
    )
}

export default Logo