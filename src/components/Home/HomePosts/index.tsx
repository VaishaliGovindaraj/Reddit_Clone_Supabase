'use client'
import { createClient } from "../../../../utils/supabase/browserclient"
import { getHomePosts, HomePostType } from "../../../../utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HomePosts = ({posts}:{posts:HomePostType}) => {

    return (
        <div className="container-narrow">
            <h1 className="text-3xl sm:text-5xl font-bold text-center mb-6 sm:mb-8 fade-in bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Latest Posts
            </h1>
            <div className="flex flex-col gap-4 sm:gap-6">
                {posts && posts.map(({id,title,slug,users}, index)=>
                    <Link
                        href={`/${slug}`}
                        className="card-interactive slide-up"
                        key={id}
                        style={{animationDelay: `${index * 0.1}s`}}
                    >
                        <h2 className="post-title">
                            {title}
                        </h2>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:mt-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                                    {users.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Written by</p>
                                    <p className="truncate font-semibold text-gray-900 dark:text-gray-100">{users.username}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-3 transition-all duration-300">
                                <span>Read more</span>
                                <span>→</span>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
            {(!posts || posts.length === 0) && (
                <div className="card text-center py-12">
                    <p className="text-lg text-gray-500 dark:text-gray-400">No posts yet. Be the first to create one!</p>
                </div>
            )}
        </div>
    )
}

export default HomePosts
