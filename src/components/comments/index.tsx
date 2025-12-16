'use client'
import { useMutation } from "@tanstack/react-query"
import { deleteComment } from "../../actions/delete-comments"
import { useState } from "react"
import { toast } from "sonner"

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
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number, slug: string) => {
    try {
      setDeletingId(id)
      await deleteComment(id, slug)
      toast.success("Comment deleted successfully", {
        description: "The comment has been removed"
      })
    } catch (error) {
      toast.error("Failed to delete comment", {
        description: "Please try again"
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="card fade-in" style={{animationDelay: '0.4s'}}>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="text-2xl">💬</span>
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Comments ({comments.length})
        </span>
      </h3>
      <div className="space-y-4">
        {comments.map((item,index) =>
          <div
            key={item.id}
            className="comment-container"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.commentor_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="comment-author mb-1">{item.commentor_name}</p>
                  <p className="comment-text">{item.comment_section}</p>
                </div>
              </div>

              {/* Show delete button if user is post author OR comment author */}
              {(currentUserId === postAuthorId || item.user_id === currentUserId) && (
                <button
                  onClick={() => handleDelete(item.id, slug)}
                  disabled={deletingId === item.id}
                  className="button-danger"
                >
                  {deletingId === item.id ? (
                    <span className="flex items-center gap-2">
                      <span className="loading-spinner w-4 h-4"></span>
                      Deleting...
                    </span>
                  ) : "Delete"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  )
}

export default Comments