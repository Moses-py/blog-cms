import ArtCard from "@/components/article_card/ArtCard";
import CatCard from "@/components/category_card/CatCard";
import Loader from "@/components/loaders/Loader";
import { getBlogData } from "@/lib/getBlogData";
import { category_listing } from "@/mocks/mocks";

export const dynamicParams = false; // true | false,

export const metadata = {
  title: "Flai-r | Categories",
};

const CategoryList = async ({ params }: { params: { slug: string } }) => {
  const data = await getBlogData().then(async (returnedData) => {
    const blogDataWithResolvedImagePromises = await Promise.all(
      returnedData!.map(async (blogItem) => ({
        ...blogItem,
        image: await blogItem.image,
      }))
    );

    const { slug } = params;

    const category_blog_data = blogDataWithResolvedImagePromises.filter(
      (data) => {
        return data.category.toLowerCase() === slug.toLowerCase();
      }
    );

    return category_blog_data.reverse();
  });

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
    </>
  );
};

export default CategoryList;
