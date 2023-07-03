/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Loader from "@/components/loaders/Loader";
import { useBlogStore } from "@/store/Blogstrore";
import { useEffect, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import CatCard from "@/components/category_card/CatCard";
import { category_listing } from "@/mocks/mocks";
import Link from "next/link";
import PaystackModal from "@/components/modal/PaystackModal";
import Comments from "@/features/comments/Comments";
import SigninModal from "@/features/comments/components/SigninModal";

export const dynamicParams = false; // true | false,

const SinglePost = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<BlogList>();
  const [comments, setComments] = useState<BlogComment[]>();
  const [
    blog_data,
    get_blog_data,
    modal,
    modalState,
    get_user,
    user,
    getComments,
    blogComments,
  ] = useBlogStore((state) => [
    state.blog_data,
    state.get_blog_data,
    state.modal,
    state.modalState,
    state.get_user,
    state.user,
    state.getComments,
    state.blogComments,
  ]);
  useEffectOnce(() => {
    if (user.id === undefined) {
      get_user();
    }
    get_blog_data();
    getComments();
  });

  useEffect(() => {
    const { slug } = params;
    const split_slug = decodeURIComponent(slug);

    const single_blog_data = blog_data.find((data) => {
      return data.slug === split_slug;
    });

    setData(single_blog_data);
    // Set Comments
    const filter_comments = blogComments.filter((comment) => {
      return comment.fileId === data?.id;
    });

    setComments(filter_comments);
  }, [params, blog_data, blogComments, data?.id]);

  return (
    <>
      {data ? (
        <>
          <section className="relative w-full h-full font-sans">
            {modalState && <SigninModal />}
            {data.image && (
              <div className="w-full relative h-[70dvh]">
                <img
                  src={data.image.href}
                  alt="article_image"
                  className="absolute inset-0 w-full h-full min-h-[400px] object-cover"
                />
              </div>
            )}

            <div
              className={`bg-white lg:container w-full h-full text-center ${
                data.image ? "mt-[-10rem]" : "mt-0"
              }  relative z-30`}
            >
              <div className="px-5 md:px-[6rem] py-[2rem]">
                <div className="flex justify-center my-[2rem] text-center">
                  <h1 className="text-[30px] xl:text-[48px] font-bold leading-tight w-full sm:w-2/3 flex justify-center font-serif">
                    {data.title}
                  </h1>
                </div>

                <div className="flex justify-between flex-col lg:flex-row items-center my-[1rem]">
                  <div className="flex justify-evenly gap-5 my-[1rem]">
                    {/* Category */}
                    <span className="text-primary text-md">
                      <Link href={`/category/${data.category}`}>
                        #{data.category}
                      </Link>
                    </span>
                    <span>|</span>
                    {/* Name */}
                    <span className="text-gray-600 text-md">
                      {data.minutes} minutes read
                    </span>
                    {/* Date */}
                  </div>
                  {/* Socials */}
                  <div className="flex gap-5 my-[1rem]">
                    <span className="text-gray-600 text-md">{data.date}</span>
                    <Link
                      href={"https://github.com/moses-py/"}
                      target="__blank"
                    >
                      <Image
                        src={"/icons/github.svg"}
                        alt="github_icon"
                        width={20}
                        height={20}
                      />
                    </Link>

                    <Link
                      href={
                        "https://www.linkedin.com/in/moses-chukwunekwu-717304163/"
                      }
                      target="__blank"
                    >
                      <Image
                        src={"/icons/linkedin.svg"}
                        alt="github_icon"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <Link href={"https://flai-r.vercel.app/"} target="__blank">
                      <Image
                        src={"/icons/globe.svg"}
                        alt="globe_icon"
                        width={20}
                        height={20}
                      />
                    </Link>
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
                    className="text-left text-[18px] w-full lg:w-2/3"
                  />
                </div>
                {/* Comments */}
                <section
                  className="w-full flex justify-center
                "
                >
                  <Comments comments={comments} id={data.id} />
                </section>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="container flex justify-center items-center h-[400px] bg-gray-100">
          <Loader />
        </div>
      )}

      <section
        id="categories"
        className="container mx-auto my-[3rem] md:my-[8rem] px-5 w-full"
      >
        <h1 className="font-serif text-[28px] lg:text-[30px] xl:text-[32px] font-bold my-[2rem] leading-tight">
          Explore other categories
        </h1>
        <div className="w-full flex gap-2 items-center overflow-x-auto overflow-y-hidden">
          {category_listing.map((category, index) => {
            return (
              <CatCard
                key={index}
                name={category.name}
                image={category.image}
              />
            );
          })}
        </div>
      </section>
      {modal && <PaystackModal />}
    </>
  );
};

export default SinglePost;
