import { database } from "@/appwrite";
import formatDate from "@/lib/getCurrentDate";
import getCurrentTime from "@/lib/getCurrentTime";
import { useBlogStore } from "@/store/Blogstrore";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { AiOutlineHeart } from "react-icons/ai";
import { BsReplyFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { PiUserThin } from "react-icons/pi";
import { ClipLoader } from "react-spinners";
import { FaTelegramPlane } from "react-icons/fa";

type Props = {
  reply: boolean;
  author: any;
  content: any;
  id: string;
  date: string;
  time: string;
  replyCount?: number | undefined;
};

const CommentBox = ({
  reply,
  author,
  content,
  id,
  time,
  date,
  replyCount,
}: Props) => {
  const [openReplyBox, setOpenReplyBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, toggleModal, singleBlogComment] = useBlogStore((state) => [
    state.user,
    state.toggleModal,
    state.singleBlogComment,
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
      const singleComment = singleBlogComment.find((comment) => {
        return comment.id === id;
      });
      // structure database payload
      const commentReply = {
        author: user.name!,
        content: data.reply!,
        date: formatDate(new Date()),
        time: getCurrentTime(),
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
            ? `bg-gray-100 text-gray-800 rounded-xl p-3 float-right w-11/12 my-3`
            : "bg-gray-100 text-gray-800 py-3 px-5 rounded-xl w-full"
        }`}
      >
        {/* Details */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center font-sans">
            <div className="flex flex-col xs:flex-row gap-2 justify-start xs:items-center text-xs font-semibold font-sans">
              {/* Image + name + datetime */}
              <span className="w-7 h-7 rounded-full bg-gray-200 grid place-items-center">
                <PiUserThin size={20} />
              </span>

              <div className="flex sm:flex-row flex-col text-left gap-x-2">
                <p className="text-left">{author}</p>
                <span className="text-gray-500 text-[0.68rem] text-left">
                  at {time}
                </span>
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-[0.68rem] font-semibold">
                {date}
              </span>
            </div>
          </div>

          {/* Comment text */}
          <div className="w-full max-w-full break-words">
            <p className="text-[14px] font-sans text-left break-words">
              {content}
            </p>
          </div>
          {/* Action buttons */}
          <div className="">
            <div className="text-xs flex gap-6 justify-between items-center">
              <span className="flex gap-1 items-center cursor-pointer">
                <>Replies ({replyCount && replyCount > 0 ? replyCount : "0"})</>
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

        <div className={`mt-3 text-left ${openReplyBox ? "block" : "hidden"}`}>
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
              className={`w-full bg-white border border-gray-300 placeholder:text-[14px] text-gray-800 rounded-md px-[17px] py-[8px] ring-transparent ring-0 outline-none focus:ring-transparent focus:ring-0 focus:outline-none`}
              placeholder="Write a reply..."
              {...register("reply", { required: true })}
            />

            <button
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-primary"
              } rounded-md px-[10px] py-[5px] text-white text-xs font-semibold`}
              type="submit"
            >
              {loading ? (
                <>
                  <ClipLoader color="white" size={20} />
                </>
              ) : (
                <FaTelegramPlane size={20} />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
