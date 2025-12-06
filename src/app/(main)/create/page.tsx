'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { postSchema } from "../../../actions/schema"
import { useMutation } from "@tanstack/react-query"
import { CreatePost } from "../../../actions/create-post"
import ErrorMessage from "../../../components/ErrorComponent"
import z from "zod"

const CreatePage = () => {

    const schemaWithImage = postSchema.omit({image:true}).
                                        extend({image:z.unknown().transform(value =>
                                        {return value as(FileList)}).optional()})

    const {register,handleSubmit,formState : {errors}} = useForm ({
        resolver:zodResolver(schemaWithImage)
    })

    const {mutate,isPending,error} = useMutation({
        mutationFn:CreatePost
    })

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="card p-8 animate-fadeInUp">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Post</h1>
                    <p className="text-gray-600">Share your thoughts with the community</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(values =>{
                                                        let imageForm = new FormData();
                                                        if(values.image?.length) {
                                                            imageForm.append('image',values.image[0])
                                                        }
                                                        mutate({title:values.title,content:values.content,image:imageForm})
                                                        })}>

                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                            Post Title
                        </label>
                        <input
                            id="title"
                            className="input-field"
                            {...register("title")}
                            placeholder="What's your post called?"
                            disabled={isPending}
                        />
                        {errors.title && <ErrorMessage message={errors.title.message!} />}
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            {...register("content")}
                            className="input-field min-h-[200px] resize-y"
                            placeholder="Share your story..."
                            disabled={isPending}
                        />
                        {errors.content && <ErrorMessage message={errors.content.message!} />}
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload an Image (Optional)
                        </label>
                        <input
                            type="file"
                            id="image"
                            {...register("image")}
                            className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            accept="image/*"
                            disabled={isPending}
                        />
                        {errors.image && <ErrorMessage message={errors.image.message!} />}
                    </div>

                    <button
                        type="submit"
                        className="button-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isPending}
                    >
                        {isPending ? "Creating Post..." : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage