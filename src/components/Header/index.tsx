import AccountLinks from "../AccountLinks"
import Logo from "../Logo"
import SearchInput from "../Search"


const Header = () => {
    return(
        <header className="header-nav">
            <div className="container-main py-3 sm:py-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto,1fr] lg:grid-cols-[auto,minmax(16rem,42rem),auto] sm:items-center lg:gap-6">
                    <div className="min-w-0">
                        <Logo />
                    </div>
                    <div className="min-w-0 sm:col-span-2 lg:col-span-1 lg:order-none">
                        <SearchInput />
                    </div>
                    <div className="sm:absolute sm:right-6 sm:top-3 lg:static lg:right-auto lg:top-auto">
                        <AccountLinks />
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header
