"use client";
import ArtCard from "@/components/article_card/ArtCard";
import CatCard from "@/components/category_card/CatCard";
import Loader from "@/components/loaders/Loader";
import PaystackModal from "@/components/modal/PaystackModal";
import { category_listing } from "@/mocks/mocks";
import { useBlogStore } from "@/store/Blogstrore";
import { useState, useEffect } from "react";
import { useEffectOnce } from "usehooks-ts";

export const dynamicParams = false; // true | false,

const CategoryList = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<BlogList[]>();
  const [blog_data, get_blog_data, modal, get_user, user] = useBlogStore(
    (state) => [
      state.blog_data,
      state.get_blog_data,
      state.modal,
      state.get_user,
      state.user,
    ]
  );
  useEffectOnce(() => {
    if (user.id === undefined) {
      get_user();
    }
    get_blog_data();
  });

  useEffect(() => {
    const { slug } = params;

    const category_blog_data = blog_data.filter((data) => {
      return data.category.toLowerCase() === slug.toLowerCase();
    });

    setData(category_blog_data);
  }, [params, blog_data]);

  return (
    <>
      <section className="w-full" id="recents">
        <div className="md:container p-3">
          <h1 className="font-serif text-[28px] lg:text-[30px] xl:text-[32px] font-bold my-[2rem] leading-tight">
            {`${params.slug[0].toUpperCase()}${params.slug.slice(
              1,
              params.slug.length
            )}`}
          </h1>
          <div className="grid w-full">
            {data?.length! > 0 ? (
              <>
                <div className=" w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
                  {data?.map((data, index) => {
                    return (
                      <ArtCard
                        key={index}
                        image={data.image?.href}
                        category={data.category}
                        date={data.date}
                        title={data.title}
                        summary={data.summary}
                        slug={data.slug}
                        minutes={data.minutes}
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
            {data?.length === 0 && <></>}
            {/* List of Articles */}
          </div>
        </div>
        <section
          id="categories"
          className="container mx-auto my-[3rem] md:my-[8rem] px-5 w-full"
        >
          <h1 className="font-serif text-[28px] lg:text-[30px] xl:text-[32px] font-bold my-[2rem] leading-tight">
            Explore other categories
          </h1>
          <div className="w-full flex gap-2 items-center overflow-x-auto overflow-y-hidden">
            {category_listing.map((category, index) => {
              if (category.name.toLowerCase() === params.slug.toLowerCase())
                return;
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
      </section>
      {modal && <PaystackModal />}
    </>
  );
};

export default CategoryList;
