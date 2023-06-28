/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Loader from "@/components/loaders/Loader";
import { getSlugData } from "@/lib/getSlugData";
import { useBlogStore } from "@/store/Blogstrore";
import { useEffect, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export const dynamicParams = false; // true | false,
export async function generateStaticParams() {
  const posts = await getSlugData();
  return posts;
}
const SinglePost = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<BlogList>();
  const [blog_data, get_blog_data] = useBlogStore((state) => [
    state.blog_data,
    state.get_blog_data,
  ]);
  useEffectOnce(() => {
    get_blog_data();
  });

  useEffect(() => {
    const { slug } = params;
    const split_slug = decodeURIComponent(slug);

    const single_blog_data = blog_data.find((data) => {
      return data.slug === split_slug;
    });

    setData(single_blog_data);
  }, [params, blog_data]);
  return (
    <>
      {data ? (
        <>
          <section className="relative w-full h-full font-sans">
            <div className="w-full relative h-[70dvh]">
              {data?.image && (
                <img
                  src={data.image.href}
                  alt="article_image"
                  className="absolute inset-0 w-full h-full min-h-[400px] object-cover"
                />
              )}
            </div>
            <div className="bg-white md:container w-full h-full text-center mt-[-10rem] relative z-30">
              <div className="px-4 md:px-[6rem] py-[2rem]">
                <div className="flex justify-center my-[2rem] text-center">
                  <h1 className="text-[30px] xl:text-[48px] font-bold leading-tight w-full sm:w-2/3 flex justify-center font-serif">
                    {data.title}
                  </h1>
                </div>

                <div className="flex justify-between flex-col lg:flex-row items-center my-[1rem]">
                  <div className="flex justify-evenly gap-5 my-[1rem]">
                    {/* Category */}
                    <span className="text-gray-600 text-md">
                      {data.category}
                    </span>
                    {/* Name */}
                    <span className="text-gray-600 text-md">
                      Moses Chukwunekwu
                    </span>
                    {/* Date */}
                  </div>
                  {/* Socials */}
                  <div className="flex gap-5 my-[1rem]">
                    <span className="text-gray-600 text-md">{data.date}</span>
                    <Image
                      src={"/icons/github.svg"}
                      alt="github_icon"
                      width={20}
                      height={20}
                    />
                    <Image
                      src={"/icons/instagram.svg"}
                      alt="github_icon"
                      width={20}
                      height={20}
                    />
                    <Image
                      src={"/icons/linkedin.svg"}
                      alt="github_icon"
                      width={20}
                      height={20}
                    />
                    <Image
                      src={"/icons/twitter.svg"}
                      alt="github_icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                {/* hr */}
                <hr className="my-[1rem]" />
                {/* Summary */}
                <div className="flex justify-center text-center my-[3rem] ">
                  <blockquote className="italic text-[18px] lg:text-[28px] w-full md:w-3/4 lg:w-1/2 font-extralight">
                    <span>&quot;</span>
                    {data.summary}
                    <span>&quot;</span>
                  </blockquote>
                </div>
                <div className="flex justify-center">
                  <div
                    dangerouslySetInnerHTML={{ __html: data.content }}
                    className="text-left text-[18px] p-3 w-full sm:w-2/3"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="container flex justify-center items-center h-[400px] bg-gray-100">
          <Loader />
        </div>
      )}
    </>
  );
};

export default SinglePost;
