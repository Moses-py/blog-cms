"use client";
import Hero from "@/components/hero/Hero";
import Category from "@/features/category_listing/Category";
import Newsletter from "@/features/newsletter/Newsletter";
import RecentArticles from "@/features/recents/RecentArticles";
import { useBlogStore } from "@/store/Blogstrore";
import { Footer } from "flowbite-react";
import { useEffectOnce } from "usehooks-ts";

export default function Home() {
  const [blog_data, get_blog_data] = useBlogStore((state) => [
    state.blog_data,
    state.get_blog_data,
  ]);
  useEffectOnce(() => {
    get_blog_data();
  });
  return (
    <main>
      {blog_data.length > 0 ? (
        <>
          <Hero />
        </>
      ) : (
        <p>No data</p>
      )}
      <Category />
      <RecentArticles />
      <Newsletter />
    </main>
  );
}
