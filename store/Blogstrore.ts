import { getBlogData } from "@/lib/getBlogData";
import { create } from "zustand";

interface BlogStoreState {
  blog_data: BlogList[];
  get_blog_data: () => void;
  modal: boolean;
  closeModal: () => void;
  openModal: () => void;
}
export const useBlogStore = create<BlogStoreState>((set) => ({
  blog_data: [],
  modal: false,
  openModal: () => {
    set({ modal: true });
  },
  closeModal: () => {
    set({ modal: false });
  },
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
