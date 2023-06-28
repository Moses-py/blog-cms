"use client";
import ArtCard from "@/components/article_card/ArtCard";
import Loader from "@/components/loaders/Loader";
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
            {newest_articles.length > 0 ? (
              <>
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
                        slug={data.slug}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="container flex justify-center items-center h-[400px] bg-gray-100">
                  <Loader />
                </div>
              </>
            )}
            {/* List of Articles */}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentArticles;
