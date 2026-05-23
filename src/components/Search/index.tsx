'use client'
import { SetStateAction, useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { searchPosts } from "../../actions/search-posts"
import { toast } from "sonner"

const SearchInput = () => {
    const [userInput,setUserInput] = useState<string>('')
    const {data, error} = useQuery({
        queryKey:['search-results',userInput],
        queryFn:async() => {
            const {data,error} = await searchPosts(userInput)
            if(error) {
                toast.error("Search failed", {
                    description: "Unable to search posts. Please try again."
                })
                throw error
            }
            return data
        },
        enabled : userInput && userInput.length > 0 ? true : false
    })

    const handleChange = (e: { target: { value: SetStateAction<string>; } ;}) => {
        setUserInput(e.target.value)
    }

    return (
        <div className="search-container">
            <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <Search size={20}/>
                </div>
                <input
                    onChange={handleChange}
                    className="search-input"
                    name="search"
                    placeholder="Search posts..."
                    value={userInput}
                />
            </div>

            {data && data.length > 0 && (
                <div className="search-results">
                    {data.map(({title,slug})=>(
                        <Link
                            className="search-result-item"
                            key={slug}
                            href={`/${slug}`}
                            onClick={()=>setUserInput('')}
                        >
                            <p className="font-medium text-gray-900 dark:text-gray-100">{title}</p>
                        </Link>
                    ))}
                </div>
            )}

            {data && data.length === 0 && userInput.length > 0 && (
                <div className="search-results">
                    <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                        No posts found matching "{userInput}"
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchInput