import { getSinglePost } from "../../../../utils/supabase/queries"
import { createClient } from "../../../../utils/supabase/server-client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import Comments from "@/components/comments"
import CommentSection from "@/components/comments/CommentSection"

const singlePost =async ({params}:{params:{slug:string}}) => {
    const {slug} = await params
    const {data,error} = await getSinglePost(slug)
    console.log(error)
    const supabase= await createClient();
    const {data:{user}} = await supabase.auth.getUser();

    const isAuthor = user?.id === data?.user_id ? true : false

    return (
        <div className="container-narrow">
           {data &&
           <>
            {/* Post Header */}
            <div className="card fade-in mb-6">
                <h1 className="post-title sm:text-4xl mb-5 sm:mb-6">{data.title}</h1>
                <div className="flex min-w-0 items-center gap-3 pb-5 sm:pb-6 divider">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md flex-shrink-0">
                        {data.users?.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Written by</p>
                        <p className="truncate font-semibold text-gray-900 dark:text-gray-100">{data.users?.username}</p>
                    </div>
                </div>
            </div>

            {/* Post Image */}
            {data?.image &&
                <div className="card fade-in mb-6 p-0 overflow-hidden" style={{animationDelay: '0.1s'}}>
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-auto max-h-[70vh] object-contain"
                    />
                </div>
            }

            {/* Post Content */}
            <div className="card fade-in mb-6" style={{animationDelay: '0.2s'}}>
                {data.content &&
                    <div className="post-content">
                        {data.content}
                    </div>
                }
            </div>

            {/* Author Actions */}
            {isAuthor &&
                <div className="card fade-in mb-6" style={{animationDelay: '0.3s'}}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-semibold">Manage Your Post</p>
                    <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                        <EditButton slug={slug}/>
                        <DeleteButton postId={data.id}/>
                    </div>
                </div>
            }

            {/* Comment Section */}
            {user && <CommentSection slug={slug} user_id={data.user_id} id={data.id}/>}

            {/* Comments List */}
            {data.comments && (
                <Comments
                    comments={data.comments}
                    currentUserId={user?.id}
                    postAuthorId={data.user_id}
                    slug={slug}
                />
            )}

            </>
           }
        </div>
    )

}

export default singlePost
