'use client'
import { useMutation } from "@tanstack/react-query"
import { DeletePost } from "../../../../actions/delete-post"
import { toast } from "sonner"

const DeleteButton = ({postId}:{postId:number}) => {
    
    const {mutate,error} = useMutation({
        mutationFn:DeletePost,
        onMutate: () => toast("Deleting your post"),
        onSettled: () => toast.success("Post Deleted")
    })

    return <button className="button-tertiary" onClick={()=>mutate(postId)}>Delete Post</button>
}

export default DeleteButton