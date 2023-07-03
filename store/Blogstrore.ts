import { account } from "@/appwrite";
import { getBlogComments } from "@/lib/getBlogComments";
import { getBlogData } from "@/lib/getBlogData";
import { toast } from "react-toastify";
import { create } from "zustand";

interface BlogStoreState {
  blog_data: BlogList[];
  get_blog_data: () => void;
  modal: boolean;
  closeModal: () => void;
  openModal: () => void;
  user: User;
  get_user: () => void;
  create_user: (uri: string) => void;
  logout_user: () => void;
  modalState: boolean;
  toggleModal: () => void;
  blogComments: BlogComment[];
  getComments: () => void;
}
export const useBlogStore = create<BlogStoreState>((set, get) => ({
  blog_data: [],

  modal: false,

  modalState: false,

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
      return;
    }
  },

  user: {
    name: undefined,
    id: undefined,
  },

  get_user: async () => {
    try {
      const user = get().user;
      if (user.id === undefined) {
        await account.get().then((userFound) => {
          if (userFound) {
            const { name, $id } = userFound;
            set({ user: { name, id: $id } });
          } else {
            return;
          }
        });
      }
    } catch (error) {
      return;
    }
  },
  create_user: async (uri: string) => {
    account.createOAuth2Session("google", uri);
  },

  logout_user: async () => {
    await account.deleteSession("current").then(() => {
      set({ user: { name: undefined, id: undefined } });
      toast("Signout successful");
    });
  },

  toggleModal: () => {
    const modalState = get().modalState;
    set({ modalState: !modalState });
  },

  blogComments: [],

  getComments: async () => {
    const comments = await getBlogComments();
    const fixed_comment = comments?.map((comment) => {
      const { replies } = comment;
      const destring_reply = replies.map((reply: string) => {
        return JSON.parse(reply);
      });

      const updatedComment = { ...comment, replies: destring_reply };
      return updatedComment;
    });
    set({ blogComments: fixed_comment });
  },
}));
