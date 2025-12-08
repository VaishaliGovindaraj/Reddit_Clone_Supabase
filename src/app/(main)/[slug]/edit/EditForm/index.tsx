
'use client'
import { Tables } from "../../../../../../utils/supabase/datatypes.types"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { EditPost } from "../../../../../actions/edit-posts"
import { postSchema } from "../../../../../actions/schema"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

const EditForm = ({postId,initialValues}:{postId:number,initialValues:Pick<Tables<'posts'>,"title"|"content"|"image">}) => {

    const schemaWithImage = postSchema.omit({image:true}).
                                            extend({image:z.unknown().transform(value =>
                                            {return value as(FileList)}).optional()})

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:zodResolver(schemaWithImage),
        defaultValues:{
            title:initialValues.title,
            content:initialValues.content || undefined,
            image:initialValues.image
        }
    })

    const {mutate,isPending} = useMutation({
        mutationFn: EditPost,
        onSuccess: () => {
            toast.success("Post updated successfully!", {
                description: "Your changes have been saved. Redirecting..."
            })
        },
        onError: (error) => {
            toast.error("Failed to update post", {
                description: error.message || "Please try again later"
            })
        }
    })

    return (
        <div className="container-narrow">
            <div className="card fade-in">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                        Edit Post
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">Update your post details</p>
                </div>

                <form onSubmit={handleSubmit(values => {
                                            let imageForm = undefined;
                                                    if(values.image?.length && typeof values.image !== 'string') {
                                                            imageForm= new FormData()
                                                            imageForm.append('image',values.image[0])
                                                        }
                                            mutate({postId, userdata:{title:values.title,content:values.content,image:imageForm}})})} className="space-y-6">

                    <div>
                        <label htmlFor="title" className="form-label">
                            Post Title
                        </label>
                        <input
                            id="title"
                            {...register("title")}
                            className={errors.title ? "input-field-error" : "input-field"}
                            placeholder="What's your post about?"
                            disabled={isPending}
                        />
                        {errors.title && <p className="form-error">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="content" className="form-label">
                            Content
                        </label>
                        <textarea
                            id="content"
                            {...register("content")}
                            className={errors.content ? "input-field-error resize-y" : "textarea-field"}
                            placeholder="Share your story..."
                            disabled={isPending}
                        />
                        {errors.content && <p className="form-error">{errors.content.message}</p>}
                    </div>

                    <div>
                        {initialValues.image && (
                            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <p className="form-label mb-3">Current Image</p>
                                <img
                                    className="w-full h-auto rounded-lg shadow-md"
                                    src={initialValues.image}
                                    alt="Current post image"
                                />
                            </div>
                        )}
                        <label htmlFor="image" className="form-label">
                            {initialValues.image ? "Upload New Image (Optional)" : "Upload an Image (Optional)"}
                        </label>
                        <input
                            type="file"
                            id="image"
                            {...register("image")}
                            className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                            accept="image/*"
                            disabled={isPending}
                        />
                        {errors.image && <p className="form-error">{errors.image.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="button-primary w-full"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="loading-spinner w-5 h-5"></span>
                                Updating Post...
                            </span>
                        ) : "Update Post"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditForm