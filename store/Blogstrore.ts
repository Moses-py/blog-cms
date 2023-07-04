import { account, client } from "@/appwrite";
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
  setComment: (comments: BlogComment) => void;
  singleBlogData: BlogList;
  setSingleBlogList: (slug: string) => void;
  singleBlogComment: BlogComment[];
  setSingleBlogComment: () => void;
  createSingleBlogDocument: (comment: BlogComment) => void;
  updateSingleBlogDocument: (replies: Reply[], id: string) => void;
}
export const useBlogStore = create<BlogStoreState>((set, get) => ({
  modal: false,

  openModal: () => {
    set({ modal: true });
  },

  closeModal: () => {
    set({ modal: false });
  },

  // Blog data states
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
      return;
    }
  },

  // User auth state
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

  // Login modal state
  modalState: false,

  toggleModal: () => {
    const modalState = get().modalState;
    set({ modalState: !modalState });
  },

  // Comment state
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

  setComment: async (comment: BlogComment) => {
    const comments = get().blogComments;
    set({ blogComments: [...comments, comment] });
  },

  // @ts-ignore
  singleBlogData: {},

  setSingleBlogList: (slug: string) => {
    const list = get().blog_data;

    const single_blog_data = list.find((data) => {
      return data.slug === slug;
    });

    set({ singleBlogData: single_blog_data });
  },

  // Single blog comment create, update
  singleBlogComment: [],

  setSingleBlogComment: () => {
    const commentList = get().blogComments;
    const data = get().singleBlogData;
    const filter_comments = commentList?.filter((comment) => {
      return comment.fileId === data.id;
    });

    set({ singleBlogComment: filter_comments.reverse() });
  },

  createSingleBlogDocument: (comment: BlogComment) => {
    const commentList = get().singleBlogComment;

    set({ singleBlogComment: [comment, ...commentList] });
  },

  updateSingleBlogDocument: (replies: Reply[], id: string) => {
    const commentList = get().singleBlogComment;
    const comment_Arr = commentList.map((comment) =>
      comment.id === id
        ? { ...comment, replies: [...replies].reverse() }
        : comment
    );

    set({ singleBlogComment: comment_Arr });
  },
}));
