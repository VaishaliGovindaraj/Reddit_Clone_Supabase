import Link from "next/link"
import { getSinglePost } from "../../../../utils/supabase/queries"

const SinglePost = async ({params}:{params : {slug: string}}) => {
    const {slug} = await params

    const {data,error} = await getSinglePost(slug)
    console.log(data)

   

    return(
        <div className="p-4 bg-gray-400 border-2 rounded-2xl mb-2 mt-4 m-auto w-[80%]">
            {data && 
            <>
            <div className="flex flex-col"> 
                <h2 className="font-bold">{data.title.toUpperCase()}</h2>
                <div className="text-right">{data.content}</div>
            </div>
            <Link href="/" className=" bg-amber-400 hover:bg-gray-700 p-4 fixed top-30 right-20">Back</Link>
            </>
            }
        </div>
    )

}

export default SinglePost