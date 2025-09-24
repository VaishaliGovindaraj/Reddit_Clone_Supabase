'use client'

import Link from "next/link"
import { getPosts, HomePostTypes } from "../../../../utils/supabase/queries"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "../../../../utils/supabase/browserclient"


const HomePosts = ({ posts }: { posts: HomePostTypes }) => {

    const { data } = useQuery({
        queryKey: ['home-posts'],
        queryFn: async () => {
            const supabase = createClient()
            const { data, error } = await getPosts(supabase)

            if (error) throw error
            return data
        },
        
        initialData: posts,
        refetchOnMount: false,
        staleTime: 10000
    })


    return (
        <div>
            {data && data.map(({ id, title, slug, created_at, users }) =>
                <div key={id} className="p-4 bg-gray-400 border-2 rounded-2xl mb-2 m-auto w-[80%]">

                    <div className="flex justify-between">
                        <Link href={`/${slug}`}><h2 className="font-bold">{title.toUpperCase()}</h2> </Link>
                        <div className="text-right">{users?.username}</div>
                    </div>

                </div>)}

        </div>
    )
}

export default HomePosts