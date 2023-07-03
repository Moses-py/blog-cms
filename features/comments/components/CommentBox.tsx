import { account, database } from "@/appwrite";
import { useBlogStore } from "@/store/Blogstrore";
import { ID } from "appwrite";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { AiOutlineHeart } from "react-icons/ai";
import { BsReplyFill } from "react-icons/bs";
import { GrView, GrClose } from "react-icons/gr";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

type Props = {
  reply: boolean;
  author: any;
  content: any;
  id: string;
};

const CommentBox = ({ reply, author, content, id }: Props) => {
  const [openReplyBox, setOpenReplyBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, toggleModal, blogComments] = useBlogStore((state) => [
    state.user,
    state.toggleModal,
    state.blogComments,
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reply: "",
    },
  });

  const handleCommentReply: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    if (user.id === undefined) {
      // Display login modal if user isn't signed in
      toggleModal();
    } else {
      // Reset input field
      reset();
      // Set button loading state
      setLoading(true);
      // Retrieve comment document associated with the reply
      const singleComment = blogComments.find((comment) => {
        return comment.id === id;
      });
      // structure database payload
      const commentReply = {
        author: user.name!,
        content: data.reply!,
      };
      // Push payload into replies array of comment document
      singleComment?.replies!.push(commentReply);

      // Loop through replies array in comment document and stringify each object
      const groupedComment = singleComment?.replies!.map((reply) => {
        return JSON.stringify(reply);
      });

      // Run database update operations
      try {
        const { $id } = await database.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID!,
          id,
          { replies: groupedComment }
        );

        if ($id) {
          toast("Reply added");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div
        className={`${
          reply
            ? "bg-gray-100 text-gray-800 rounded-xl py-3 px-5 float-right w-11/12 my-3"
            : "bg-gray-100 text-gray-800 py-3 px-5 rounded-xl w-full"
        }`}
      >
        {/* Details */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center text-xs font-semibold font-sans">
            {/* Image + name + datetime */}
            <Image
              src="/test.jpg"
              alt="test_avatar"
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="">{author}</p>
            <span>16-04</span>
          </div>
          {/* Comment text */}
          <div className="w-full max-w-full break-words">
            <p className=" font-[14px] font-sans text-left break-words">
              {content}
            </p>
          </div>
          {/* Action buttons */}
          <div className="">
            <div className="text-xs flex gap-6 justify-between items-center">
              <span className="flex gap-1 items-center cursor-pointer">
                <AiOutlineHeart /> 30 likes
              </span>
              {!reply && (
                <span
                  className="flex gap-1 items-center cursor-pointer"
                  onClick={() => setOpenReplyBox(!openReplyBox)}
                >
                  {openReplyBox ? (
                    <>
                      <GrClose /> Close
                    </>
                  ) : (
                    <>
                      <BsReplyFill /> Reply
                    </>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Reply input */}

        <div
          className={`py-4 mt-3 text-left ${openReplyBox ? "block" : "hidden"}`}
        >
          {errors.reply && (
            <span className="text-red-600 text-xs text-left">
              This field is required
            </span>
          )}
          <form
            className="flex gap-2"
            onSubmit={handleSubmit(handleCommentReply)}
          >
            <input
              type="text"
              className={`w-full bg-white  border  text-gray-800 rounded-md px-[17px py-[10px] ring-transparent ring-0 outline-none focus:ring-transparent focus:ring-0 focus:outline-none`}
              placeholder="Write a reply..."
              {...register("reply", { required: true })}
            />

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
                "Reply"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
