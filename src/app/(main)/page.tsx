
import { createClient } from "../../../utils/supabase/browserclient";
import { getPosts } from "../../../utils/supabase/queries";
import HomePosts from "@/components/Home/HomePosts";

export default async function Home() {
  const supabase = await createClient();
  const {data,error} = await getPosts(supabase)
  

  return (
    <div>
      {data && <HomePosts posts={data} />}
    </div>
  );
}
