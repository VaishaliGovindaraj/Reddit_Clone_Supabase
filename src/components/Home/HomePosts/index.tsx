'use client'
import { HomePostType } from "../../../../utils/supabase/queries";
import Link from "next/link";

const HomePosts = ({posts}:{posts:HomePostType}) => {

    return (
        <div className="container-narrow">
            <h1 className="text-5xl font-bold text-center mb-8 fade-in bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Latest Posts
            </h1>
            <div className="flex flex-col gap-6">
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
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                    {users.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Written by</p>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">{users.username}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-3 transition-all duration-300">
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
