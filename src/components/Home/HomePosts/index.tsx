'use client'
import { createClient } from "../../../../utils/supabase/browserclient"
import { getHomePosts, HomePostType } from "../../../../utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HomePosts = ({posts}:{posts:HomePostType}) => {

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-white text-center mb-8 animate-fadeInUp">
                Latest Posts
            </h1>
            <div className="flex flex-col gap-6">
                {posts && posts.map(({id,title,slug,users}, index)=>
                    <Link
                        href={`/${slug}`}
                        className="card p-6 group animate-fadeInUp hover:bg-white"
                        key={id}
                        style={{animationDelay: `${index * 0.1}s`}}
                    >
                        <h2 className="font-bold text-2xl text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                            {title}
                        </h2>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {users.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Written by</p>
                                    <p className="font-semibold text-gray-800">{users.username}</p>
                                </div>
                            </div>
                            <div className="text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                Read more →
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default HomePosts
