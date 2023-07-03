"use client";
import { useBlogStore } from "@/store/Blogstrore";
import Link from "next/link";

const Hero = () => {
  const [blog_data] = useBlogStore((state) => [state.blog_data]);
  const filtered_blog_data = blog_data.filter((data) => {
    return data.image;
  });
  const single_data = filtered_blog_data[0];

  return (
    <>
      <section className="w-full p-0 h-full font-sans">
        <div className="md:container md:mx-auto relative">
          {single_data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={single_data.image?.href}
              alt={""}
              className="w-full h-full min-h-[400px] object-cover"
            />
          )}
          <div className="relative md:absolute md:left-[2rem] bottom-0 min-w-[280px] w-full md:w-[400px] md:border-l md:border-b md:border-gray-200">
            <div className="py-[2rem] px-8 bg-white flex flex-col gap-y-[1.2rem]">
              <p className="text-[14px]">{single_data?.category}</p>
              <h1 className="text-[24px] lg:text-[30px] xl:text-[32px] leading-tight font-serif font-bold ">
                {single_data?.title}
              </h1>
              <p className="text-gray-500 text-[14px] my-2">
                Moses Chukwunekwu | {single_data.date}
              </p>
              <button className="px-[10px] py-[8px] bg-black text-white w-fit">
                <Link href={`/post/${single_data.slug}`}>Read more</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
