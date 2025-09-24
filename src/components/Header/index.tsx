import AccountLinks from "../AccountLinks"
import Logo from "../Logo"
import SearchInput from "../Search"


const Header = () => {
    return(
        <header className="flex  items-center justify-evenly pb-4 flex-wrap ">
                <Logo />
                <SearchInput />
                <AccountLinks />
                {/* <button className="button-tertiary">Test</button> */}
                
                <div className="mt-4 mx-auto w-[90%] border-b-3 border-black"></div>
        </header>

    )
}

export default Header