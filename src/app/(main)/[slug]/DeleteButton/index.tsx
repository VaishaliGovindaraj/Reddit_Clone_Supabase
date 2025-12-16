'use client'
import { useMutation } from "@tanstack/react-query"
import { DeletePost } from "../../../../actions/delete-post"
import { toast } from "sonner"

const DeleteButton = ({postId}:{postId:number}) => {

    const {mutate, isPending} = useMutation({
        mutationFn:DeletePost,
        onMutate: () => {
            toast.loading("Deleting your post...", { id: 'delete-post' })
        },
        onSuccess: () => {
            toast.success("Post deleted successfully!", {
                id: 'delete-post',
                description: "Redirecting to homepage..."
            })
        },
        onError: (error) => {
            toast.error("Failed to delete post", {
                id: 'delete-post',
                description: error.message || "Please try again"
            })
        }
    })

    return (
        <button
            className="button-danger"
            onClick={()=>mutate(postId)}
            disabled={isPending}
        >
            {isPending ? (
                <span className="flex items-center gap-2">
                    <span className="loading-spinner w-4 h-4"></span>
                    Deleting...
                </span>
            ) : "Delete Post"}
        </button>
    )
}

export default DeleteButton