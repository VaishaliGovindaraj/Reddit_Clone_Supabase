import { createClient } from "../../../utils/supabase/browserclient"
// "@/utils/supabase/browser-client";
import { getHomePosts } from "../../../utils/supabase/queries";
import HomePosts from "@/components/Home/HomePosts";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();
  const {data,error} = await getHomePosts(supabase)
  console.log("Data", data)
  console.log("Error", error)

  return (
    <div>
      {data && <HomePosts posts={data} />}
    </div>
  );
}