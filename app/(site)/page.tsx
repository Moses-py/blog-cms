import Hero from "@/components/hero/Hero";
import Category from "@/features/category_listing/Category";
import RecentArticles from "@/features/recents/RecentArticles";

import { getBlogData } from "@/lib/getBlogData";

export default async function Home() {
  const data = await getBlogData().then(async (returnedData) => {
    const blogDataWithResolvedImagePromises = await Promise.all(
      returnedData!.map(async (blogItem) => ({
        ...blogItem,
        image: await blogItem.image,
      }))
    );

    return blogDataWithResolvedImagePromises;
  });

  return (
    <main>
      {data.length > 0 && <Hero blog_data={data} />}
      <Category />
      <RecentArticles blog_data={data} />
    </main>
  );
}
