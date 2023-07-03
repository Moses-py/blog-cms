import { database } from "@/appwrite";

export const getBlogComments = async () => {
  const comment_docs = await database
    .listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID!
    )
    .then(
      function (response) {
        return response; // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );

  const data = comment_docs?.documents.map((docs) => {
    return {
      id: docs.$id,
      fileId: docs.fileId,
      userId: docs.userId,
      content: docs.content,
      author: docs.author,
      replies: docs.replies,
    };
  });

  return data;
};
