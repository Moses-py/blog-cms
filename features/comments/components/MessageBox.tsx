"use client";

import { ID, account, database } from "@/appwrite";
import { useBlogStore } from "@/store/Blogstrore";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import formatDate from "@/lib/getCurrentDate";
import getCurrentTime from "@/lib/getCurrentTime";

const MessageBox = ({ fileId }: any) => {
  const [loading, setLoading] = useState(false);

  const [user, toggleModal] = useBlogStore((state) => [
    state.user,
    state.toggleModal,
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const handleCommentPost: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    const session = account.getSession("current");
    if (user.id === undefined) {
      // Display login modal if user isn't signed in
      toggleModal();
    } else {
      // Reset input field
      reset();

      // Set button loading state
      setLoading(true);

      // Retrieve current logged in user
      const user = await account.get();

      // structure database payload
      const userComment = {
        userId: user.$id,
        fileId,
        author: user.name,
        time: getCurrentTime(),
        date: formatDate(new Date()),
        replies: [],
        content: data.content,
      };

      // Run database create operation
      try {
        const { $id } = await database.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID!,
          ID.unique(),
          { ...userComment }
        );

        if ($id) {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full text-left">
      {errors.content && (
        <span className="text-red-600 text-xs">This field is required</span>
      )}
      <div className="rounded-xl border border-gray-300 w-full ">
        <form onSubmit={handleSubmit(handleCommentPost)}>
          <textarea
            id="comment_box"
            rows={5}
            placeholder="write a comment..."
            {...register("content", { required: true })}
            className={`border-none placeholder:text-gray-500 py-5 w-full rounded-xl ring-transparent ring-0 outline-none focus:ring-transparent focus:ring-0 focus:outline-none`}
          />
          <div className="flex justify-end items-end p-5 border-t border-t-gray-300 bg-gray-100">
            <button
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-primary"
              } rounded-md px-[17px] py-[10px] text-white text-xs font-semibold`}
              type="submit"
            >
              {loading ? (
                <>
                  <ClipLoader color="white" size={20} />
                </>
              ) : (
                "Post comment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageBox;
