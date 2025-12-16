'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { postSchema } from "../../../actions/schema"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "../../../actions/create-post"
import z from "zod"
import { toast } from "sonner"

const CreatePage = () => {

    const schemaWithImage = postSchema.omit({image:true}).
                                        extend({image:z.unknown().transform(value =>
                                        {return value as(FileList)}).optional()})

    const {register,handleSubmit,formState : {errors}} = useForm ({
        resolver:zodResolver(schemaWithImage)
    })

    const {mutate,isPending} = useMutation({
        mutationFn:CreatePost,
        onSuccess: () => {
            toast.success("Post created successfully!", {
                description: "Your post is now live. Redirecting..."
            })
        },
        onError: (error) => {
            toast.error("Failed to create post", {
                description: error.message || "Please try again later"
            })
        }
    })

    return (
        <div className="container-narrow">
            <div className="card fade-in">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                        Create New Post
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">Share your thoughts with the community</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(values =>{
                                                        let imageForm = new FormData();
                                                        if(values.image?.length) {
                                                            imageForm.append('image',values.image[0])
                                                        }
                                                        mutate({title:values.title,content:values.content,image:imageForm})
                                                        })}>

                    <div>
                        <label htmlFor="title" className="form-label">
                            Post Title
                        </label>
                        <input
                            id="title"
                            className={errors.title ? "input-field-error" : "input-field"}
                            {...register("title")}
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
                        <label htmlFor="image" className="form-label">
                            Upload an Image (Optional)
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
                                Creating Post...
                            </span>
                        ) : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage