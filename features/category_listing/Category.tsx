"use client";
import CatCard from "@/components/category_card/CatCard";
import { category_listing } from "@/mocks/mocks";

const Category = () => {
  return (
    <>
      <section
        id="categories"
        className="container mx-auto my-[3rem] md:my-[8rem] px-5 w-full"
      >
        <h1 className="font-serif text-[28px] lg:text-[30px] xl:text-[32px] font-bold my-[2rem] leading-tight">
          Explore categories
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
    </>
  );
};

export default Category;
