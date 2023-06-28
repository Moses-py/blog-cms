import { getBlogData } from "@/lib/getBlogData";
import { create } from "zustand";

interface BlogStoreState {
  blog_data: BlogList[];
  get_blog_data: () => void;
}
export const useBlogStore = create<BlogStoreState>((set, get) => ({
  blog_data: [],
  get_blog_data: async () => {
    try {
      const data = await getBlogData();

      if (data) {
        const blogDataWithResolvedImagePromises = await Promise.all(
          data.map(async (blogItem) => ({
            ...blogItem,
            image: await blogItem.image,
          }))
        );

        set({ blog_data: blogDataWithResolvedImagePromises.reverse() });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
