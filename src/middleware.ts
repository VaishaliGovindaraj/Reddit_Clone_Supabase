import { createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (request: NextRequest) => {
        let supabaseResponse = NextResponse.next({request})

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

        // Skip middleware if env vars are not set (e.g., during build)
        if (!supabaseUrl || !supabaseKey) {
            return supabaseResponse;
        }

        const supabase = createServerClient(
            supabaseUrl,
            supabaseKey,
            {
                cookies: {
                    getAll(){
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet){
                        cookiesToSet.forEach(({name,value})=> request.cookies.set(name,value))

                           cookiesToSet.forEach(({name,value,options}) => 
                                supabaseResponse.cookies.set(name,value,options))
                    }
                }
            }
        )

        const {data:{user}, error} = await supabase.auth.getUser()
       

        // const protectedRoutes = [
        //     /^\/create$/
        // ]

        
  const protectedRoutes = [
    /^\/create\/?$/  // matches /create and /create/
  ]

       

        if(!user && protectedRoutes.some(route => route.test(request.nextUrl.pathname)) ){
            const newUrl = request.nextUrl.clone()
            newUrl.pathname = "/auth/login"
            return NextResponse.redirect(newUrl)
        }
        return supabaseResponse


        
}