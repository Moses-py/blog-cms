"use client";
import ArtCard from "@/components/article_card/ArtCard";
import { useBlogStore } from "@/store/Blogstrore";
import React from "react";

const RecentArticles = () => {
  const [blog_data] = useBlogStore((state) => [state.blog_data]);
  const newest_articles = blog_data.slice(0, 6);
  return (
    <>
      <section className="w-full" id="recents">
        <div className="md:container p-3">
          <h1 className="font-serif text-[28px] lg:text-[30px] xl:text-[32px] font-bold my-[2rem] leading-tight">
            Recent articles
          </h1>
          <div className="grid w-full">
            {/* List of Articles */}
            <div className=" w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
              {newest_articles.map((data, index) => {
                return (
                  <ArtCard
                    key={index}
                    image={data.image?.href}
                    category={data.category}
                    date={data.date}
                    title={data.title}
                    summary={data.summary}
                  />
                );
              })}
            </div>
            {/* Aside bar */}
            {/* <aside className=" bg-green-500 w-1/3 block"></aside> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentArticles;
