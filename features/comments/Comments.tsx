"use client";
import { useEffect, useState } from "react";
import CommentBox from "./components/CommentBox";
import MessageBox from "./components/MessageBox";
import { client } from "@/appwrite";
import { useBlogStore } from "@/store/Blogstrore";

const Comments = () => {
  const [
    singleBlogComment,
    singleBlogData,
    createSingleBlogDocument,
    updateSingleBlogDocument,
  ] = useBlogStore((state) => [
    state.singleBlogComment,
    state.singleBlogData,
    state.createSingleBlogDocument,
    state.updateSingleBlogDocument,
  ]);

  const [visibleItems, setVisibleItems] = useState(3);

  const showMoreComments = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
  };

  useEffect(() => {
    console.log(singleBlogComment);
    const unsubscribe = client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID}.documents`,
      (response) => {
        if (response.payload) {
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            // @ts-ignore
            const {
              // @ts-ignore
              $id,
              // @ts-ignore
              fileId,
              // @ts-ignore
              userId,
              // @ts-ignore
              content,
              // @ts-ignore
              author,
              // @ts-ignore
              replies,
              // @ts-ignore
              time,
              // @ts-ignore
              date,
            } = response.payload;

            const destring_reply = replies?.map((reply: string) => {
              return JSON.parse(reply);
            });

            const updatedComment = {
              id: $id,
              fileId,
              userId,
              content,
              author,
              time,
              date,
              replies: destring_reply,
            };
            createSingleBlogDocument(updatedComment);
          } else if (
            response.events.includes(
              "databases.*.collections.*.documents.*.update"
            )
          ) {
            //@ts-ignore
            const { $id, replies } = response.payload;

            const destring_reply: Reply[] = replies?.map((reply: string) => {
              return JSON.parse(reply);
            });

            updateSingleBlogDocument(destring_reply, $id);
          }
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [
    singleBlogComment,
    createSingleBlogDocument,
    updateSingleBlogDocument,
    singleBlogData,
  ]);

  return (
    <>
      <section className="py-5 w-full">
        <div className="w-full grid place-items-center">
          <div className="lg:w-2/3 w-full ">
            <h2 className="text-gray-900 text-left my-5 text-[18px] lg:text-[24px] font-bold">
              Discussions ({singleBlogComment.length})
            </h2>
            <div>
              <MessageBox fileId={singleBlogData.id} />
            </div>
            {/* Comments list */}

            <section className="mt-[3rem]">
              {/* Comment */}
              {singleBlogComment.length > 0 ? (
                <>
                  {singleBlogComment
                    .slice(0, visibleItems)
                    .map((comment, index) => {
                      return (
                        <>
                          <div
                            className="w-full relative flex flex-col rounded-xl max-h-[400px] my-2"
                            key={index}
                          >
                            {/* Comment */}
                            <div>
                              <CommentBox
                                id={comment.id}
                                reply={false}
                                author={comment.author}
                                content={comment.content}
                                time={comment.time}
                                date={comment.date}
                                replyCount={comment.replies?.length}
                              />
                            </div>
                            {/* reply */}
                            {comment.replies && (
                              <div className="relative my-2 max-h-[200px] overflow-auto px-2">
                                {comment?.replies!.map((reply, reply_index) => {
                                  return (
                                    <CommentBox
                                      id={comment.id}
                                      reply={true}
                                      author={reply.author}
                                      content={reply.content}
                                      time={reply.time}
                                      date={reply.date}
                                      key={reply_index}
                                    />
                                  );
                                })}
                              </div>
                            )}
                            {/* View replies */}
                          </div>
                        </>
                      );
                    })}

                  <div className="flex justify-between items-center">
                    <span
                      className="flex gap-1 items-center text-grey-800 text-sm cursor-pointer my-3"
                      onClick={showMoreComments}
                    >
                      {singleBlogComment.slice(0, visibleItems).length ===
                      singleBlogComment.length
                        ? "No more comments"
                        : `View ${
                            singleBlogComment.length -
                            singleBlogComment.slice(0, visibleItems).length
                          } more comments`}
                    </span>
                    <span
                      className="flex gap-1 items-center text-grey-800 text-sm cursor-pointer my-3"
                      onClick={() => setVisibleItems(3)}
                    >
                      Hide
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid place-items-center w-full p-5">
                    <p className="italic etxt-gray-700">
                      Be the first to leave a review...
                    </p>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Comments;
