import Logo from "@/components/Logo";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    return(
        <div>
            <header className="flex  items-center justify-evenly pb-4 flex-wrap ">
                <Logo />

            </header>
            {children}
        </div>
        
          
    )
}

export default AuthLayout