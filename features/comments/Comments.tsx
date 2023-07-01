import { Key, useState } from "react";
import CommentBox from "./components/CommentBox";
import MessageBox from "./components/MessageBox";

const Comments = ({ comments }: any) => {
  const [shortComments, setShortComments] = useState(comments.slice(0, 3));

  function showMoreComments() {
    const moreComments = comments.slice(0, shortComments.length + 3);
    setShortComments(moreComments);
  }

  return (
    <>
      <section className="py-5 w-full">
        <div className="w-full grid place-items-center">
          <div className="lg:w-2/3 w-full ">
            <h2 className="text-gray-900 text-left my-5 text-[18px] lg:text-[24px] font-bold">
              Discussions (5)
            </h2>
            <div>
              <MessageBox />
            </div>
            {/* Comments list */}

            <section className="mt-[3rem]">
              {/* Comment */}
              {shortComments.map(
                (
                  comment: {
                    author: string;
                    content: string;
                    replies: { author: string; content: string }[];
                  },
                  index: any
                ) => {
                  return (
                    <>
                      <div className="w-full relative flex flex-col rounded-xl max-h-[400px] my-4">
                        {/* Comment */}
                        <div>
                          <CommentBox
                            reply={false}
                            author={comment.author}
                            content={comment.content}
                            key={index}
                          />
                        </div>
                        {/* reply */}
                        <div className="relative my-4 max-h-[200px] overflow-auto px-2">
                          {comment.replies.map(
                            (
                              reply: { author: string; content: string },
                              reply_index: Key | null | undefined
                            ) => {
                              return (
                                <CommentBox
                                  reply={true}
                                  author={reply.author}
                                  content={reply.content}
                                  key={reply_index}
                                />
                              );
                            }
                          )}
                        </div>
                        {/* View replies */}
                      </div>
                    </>
                  );
                }
              )}

              <div className="flex justify-between items-center">
                <span
                  className="flex gap-1 items-center text-grey-800 text-sm cursor-pointer my-3"
                  onClick={showMoreComments}
                >
                  {shortComments.length === comments.length
                    ? "No more comments"
                    : `View ${comments.length - shortComments.length} comments`}
                </span>
                <span
                  className="flex gap-1 items-center text-grey-800 text-sm cursor-pointer my-3"
                  onClick={() => setShortComments(comments.slice(0, 1))}
                >
                  Hide
                </span>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Comments;
