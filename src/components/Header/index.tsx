import AccountLinks from "../AccountLinks"
import Logo from "../Logo"
import SearchInput from "../Search"


const Header = () => {
    return(
        <header className="header-nav">
            <div className="container-main py-4">
                <div className="flex items-center justify-between gap-6 flex-wrap">
                    <Logo />
                    <div className="flex-1 max-w-2xl">
                        <SearchInput />
                    </div>
                    <AccountLinks />
                </div>
            </div>
        </header>

    )
}

export default Header