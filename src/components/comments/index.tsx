'use client'
import { useMutation } from "@tanstack/react-query"
import { deleteComment } from "../../actions/delete-comments"
import { useTransition } from "react"
import { DeletePost } from "../../actions/delete-post"

type commentProps = {
  comment_section: string
  commentor_name: string
  id: number
  user_id: string
}

type CommentArray = {
  comments: commentProps[]
  currentUserId: string | undefined
  postAuthorId: string
  slug: string
}

const Comments = ({ comments, currentUserId, postAuthorId, slug }: CommentArray) => {

  const handleDelete = (id: number,slug:string) => {
      deleteComment(id, slug)
  }

  const {mutate,isPending,error} = useMutation({
        mutationFn:DeletePost,
    })

  return (
    <div className="card p-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-purple-600">💬</span>
        Comments ({comments.length})
      </h3>
      <div className="space-y-4">
        {comments.map((item,index) =>
          <div
            key={item.id}
            className="bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.commentor_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">{item.commentor_name}</p>
                  <p className="text-gray-700 leading-relaxed">{item.comment_section}</p>
                </div>
              </div>

              {/* Show delete button if user is post author OR comment author */}
              {(currentUserId === postAuthorId || item.user_id === currentUserId) && (
                <button
                  onClick={() => handleDelete(item.id,slug)}
                  disabled={isPending}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  )
}

export default Comments