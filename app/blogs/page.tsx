import ArtCard from "@/components/article_card/ArtCard";
import CatCard from "@/components/category_card/CatCard";
import Loader from "@/components/loaders/Loader";
import { getBlogData } from "@/lib/getBlogData";
import { category_listing } from "@/mocks/mocks";

export const metadata = {
  title: "Flai-r | blogs",
};
const Blogs = async () => {
  const data = await getBlogData().then(async (returnedData) => {
    const blogDataWithResolvedImagePromises = await Promise.all(
      returnedData!.reverse().map(async (blogItem) => ({
        ...blogItem,
        image: await blogItem.image,
      }))
    );

    return blogDataWithResolvedImagePromises;
  });

  return (
    <>
      <section className="w-full" id="recents">
        <div className="md:container p-3">
          <h1 className="font-serif text-[28px] lg:text-[30px] xl:text-[32px] font-bold my-[2rem] leading-tight">
            All Posts
          </h1>
          <div className="grid w-full">
            {data.length > 0 ? (
              <>
                <div className=" w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
                  {data.map((data, index) => {
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
            {/* List of Articles */}
          </div>
        </div>
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
      </section>
    </>
  );
};

export default Blogs;
