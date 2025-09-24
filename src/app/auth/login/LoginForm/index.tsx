const LogInForm = () => {
    return(
        <>
        <form className="flex flex-col m-auto">
         
            <fieldset className="m-2">
                <label htmlFor="email">Enter your email</label>
                <input id="email" className="ml-2 bg-gray-300 rounded-2xl p-2 " name="email" placeholder="enter your email id"/>
            </fieldset>

              <fieldset>
                <label htmlFor="password">Enter your password</label>
                <input id="password" type="password" name="password" className="ml-2  bg-gray-300 rounded-2xl p-2 " placeholder="enter your password id"/>
            </fieldset>

            <button className="button-secondary w-1/4">Log In!</button>
        </form>
        
        </>
    )
}

export default LogInForm