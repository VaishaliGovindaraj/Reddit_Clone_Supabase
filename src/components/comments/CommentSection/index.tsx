        
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { commentSchema } from "../../../actions/schema"
import { useMutation } from "@tanstack/react-query"
import { CreateComment } from "../../../actions/create-comment"
import { toast } from "sonner"

const CommentSection = ({ slug ,user_id,id}: { slug: string,user_id:string,id:number }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(commentSchema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: CreateComment,
    onSuccess: () => {
      reset()
      toast.success("Comment added successfully!")
    },
    onError: () => {
      toast.error("Failed to add comment")
    }
  })

  return (
    <div className="card p-6 mb-6 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Add a Comment</h3>
      <form onSubmit={handleSubmit(values => {
        mutate({ comment_section: values.comment_section, slug, id})
      })} className="space-y-4">
        <div>
          <textarea
            {...register("comment_section")}
            className="input-field min-h-[120px] resize-y"
            placeholder="Share your thoughts..."
            disabled={isPending}
          />
          {errors.comment_section && (
            <p className="text-red-500 text-sm mt-2 font-medium">
              {errors.comment_section.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="button-secondary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  )
}

export default CommentSection