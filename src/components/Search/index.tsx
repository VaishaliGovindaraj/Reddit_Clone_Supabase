'use client'
import { SetStateAction, useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getSearchPost } from "../../../utils/supabase/queries"
// /utils/supabase/queries"

const SearchInput = () => {
    const [userInput,setUserInput] = useState<string>('')
    const {data} = useQuery({
        queryKey:['search-results',userInput],
        queryFn:async() => {
            const {data,error} =await getSearchPost(userInput)
            if(error) throw new Error
            return data
        },
        enabled : userInput && userInput.length > 0 ? true : false
    })

    console.log('search results: ',data)

    const handleChange = (e: { target: { value: SetStateAction<string>; } ;}) => {
        setUserInput(e.target.value)
    }

    return (
        <div className="relative">
        <div className=" flex items-center gap-2">
            <Search size={32}/>
            <input onChange={handleChange} className="border-1 rounded-xl p-2" name="search" placeholder="Search by post title" 
            value={userInput} />
            
        </div>
        {data && 
            <div onClick={()=>setUserInput('')} className="border absolute bg-white rounded-xl p-2">
                {data.map(({title,slug})=><Link  className="block " key={slug} href={`/${slug}`}>{title}</Link>)}
            </div>}
        </div>
    )
}

export default SearchInput