"use client";
import Hero from "@/components/hero/Hero";
import Category from "@/features/category_listing/Category";
import RecentArticles from "@/features/recents/RecentArticles";
import { useBlogStore } from "@/store/Blogstrore";
import { useEffectOnce } from "usehooks-ts";
import PaystackModal from "@/components/modal/PaystackModal";

import Loader from "@/components/loaders/Loader";

export default function Home() {
  const [blog_data, get_blog_data, modal, get_user, getComments] = useBlogStore(
    (state) => [
      state.blog_data,
      state.get_blog_data,
      state.modal,
      state.get_user,
      state.getComments,
    ]
  );

  useEffectOnce(() => {
    get_user();
    get_blog_data();
    getComments();
  });

  return (
    <main>
      {blog_data.length > 0 ? (
        <>
          <Hero />
        </>
      ) : (
        <div className="container flex justify-center items-center h-[400px] bg-gray-100">
          <Loader />
        </div>
      )}
      <Category />
      <RecentArticles />
      {modal && <PaystackModal />}
    </main>
  );
}
