import { database } from "@/appwrite";

export const listDocs = async () => {
  const promise = await database
    .listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!
    )
    .then(
      function (response) {
        return response; // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );

  return promise;
};
