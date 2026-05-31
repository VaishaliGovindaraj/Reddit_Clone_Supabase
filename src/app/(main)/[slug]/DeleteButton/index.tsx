'use client'
import { useMutation } from "@tanstack/react-query"
import { DeletePost } from "../../../../actions/delete-post"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const DeleteButton = ({postId}:{postId:number}) => {
    const router = useRouter()

    const {mutate, isPending} = useMutation({
        mutationFn:DeletePost,
        onMutate: () => {
            toast.loading("Deleting your post...", { id: 'delete-post' })
        },
        onSuccess: (result) => {
            if(result.error){
                toast.error("Failed to delete post", {
                    id: 'delete-post',
                    description: result.error
                })
                return
            }

            if(!result.redirectTo){
                toast.error("Failed to delete post", {
                    id: 'delete-post',
                    description: "Please try again"
                })
                return
            }

            toast.success("Post deleted successfully!", {
                id: 'delete-post',
                description: "Redirecting to homepage..."
            })
            router.push(result.redirectTo)
            router.refresh()
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
