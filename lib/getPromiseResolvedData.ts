import { getBlogData } from "./getBlogData";

export default async function getPromiseResolvedData() {
  const data = await getBlogData().then(async (returnedData) => {
    const blogDataWithResolvedImagePromises = await Promise.all(
      returnedData!.map(async (blogItem) => ({
        ...blogItem,
        image: await blogItem.image,
      }))
    );

    return blogDataWithResolvedImagePromises;
  });

  return data;
}
