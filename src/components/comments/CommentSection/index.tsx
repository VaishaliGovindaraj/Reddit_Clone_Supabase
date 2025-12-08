
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
      toast.success("Comment added successfully!", {
        description: "Your comment is now visible"
      })
    },
    onError: (error) => {
      toast.error("Failed to add comment", {
        description: "Please try again"
      })
    }
  })

  return (
    <div className="card fade-in mb-6" style={{animationDelay: '0.3s'}}>
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        Add a Comment
      </h3>
      <form onSubmit={handleSubmit(values => {
        mutate({ comment_section: values.comment_section, slug, id})
      })} className="space-y-4">
        <div>
          <textarea
            {...register("comment_section")}
            className={errors.comment_section ? "input-field-error resize-y" : "textarea-field"}
            placeholder="Share your thoughts..."
            disabled={isPending}
          />
          {errors.comment_section && (
            <p className="form-error">
              {errors.comment_section.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="button-primary w-full sm:w-auto"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="loading-spinner w-4 h-4"></span>
              Posting...
            </span>
          ) : "Post Comment"}
        </button>
      </form>
    </div>
  )
}

export default CommentSection