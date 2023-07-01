import Image from "next/image";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsReplyFill } from "react-icons/bs";
import { GrView, GrClose } from "react-icons/gr";

type Props = {
  reply: boolean;
  author: string;
  content: string;
};

const CommentBox = ({ reply, author, content }: Props) => {
  const [openReplyBox, setOpenReplyBox] = useState(false);
  return (
    <>
      <div
        className={`${
          reply
            ? "bg-gray-100 text-gray-800 rounded-xl py-3 px-5 float-right w-11/12 my-3"
            : "bg-gray-100 text-gray-800 py-3 px-5 rounded-xl"
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
            <p className="">Nameholder</p>
            <span>16-04</span>
          </div>
          {/* Comment text */}
          <div className="w-full">
            <p className=" font-[14px] font-sans text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              minus similique assumenda minus similique assumenda
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

        <div className={`py-4 mt-3 ${openReplyBox ? "block" : "hidden"}`}>
          <input
            type="text"
            className="w-full bg-white border border-gray-300 text-gray-800 rounded-md px-[17px py-[10px] focus:ring-gray-300 focus:outline-none outline-none focus:ring-1"
            placeholder="Write a reply..."
          />
        </div>
      </div>
    </>
  );
};

export default CommentBox;
