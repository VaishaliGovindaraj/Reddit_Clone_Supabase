'use client'

import { SetStateAction, useState } from "react"
import { SearchCheck } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getSearchedPost } from "../../../utils/supabase/queries"
import Link from "next/link"

const SearchInput = () => {

    const [userInput, setUserInput] = useState<string>('')

    const {data} = useQuery({
        queryKey: ['search-results',userInput],
        queryFn : async() => {
            const {data,error} = await getSearchedPost(userInput)
            if(error) throw error
            return data
        },
        enabled: userInput && userInput.length > 1 ? true : false
    })

    console.log("Search Result:",data)


    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setUserInput(e.target.value)
        console.log(userInput)  
    }


    return(
        <div className="relative">
        <div className="rounded-2xl p-4 flex items-center justify-evenly">            
            <input name="search" className="bg-white p-4 mx-2 rounded-xl hover:bg-gray-300 border-2" onChange={handleChange}  placeholder="Enter text to search" value={userInput}/>
            <SearchCheck />
            <button onClick={() => setUserInput('')}>Clear</button>
            <div className="absolute top-20 p-4 rounded-2xl flex flex-col ">
                {data && 
                data.map(({title,slug})=> <Link  className="  bg-gray-400 mb-1 p-2 border-1 " key={slug} href={`/${slug}`}>{title}</Link> )}
            </div>
            

        </div>
        </div>
    )
}

export default SearchInput