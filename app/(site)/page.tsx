import Hero from "@/components/hero/Hero";
import Category from "@/features/category_listing/Category";
import RecentArticles from "@/features/recents/RecentArticles";

import getPromiseResolvedData from "@/lib/getPromiseResolvedData";

export default async function Home() {
  const data = await getPromiseResolvedData();

  return (
    <main>
      {data.length > 0 && <Hero blog_data={data} />}
      <Category />
      <RecentArticles blog_data={data} />
    </main>
  );
}

export const revalidate = 10;
