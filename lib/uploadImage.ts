import { ID, storage } from "@/appwrite";

export const uploadImage = async (file: File | undefined) => {
  if (file === undefined) return;

  const promise = await storage
    .createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, ID.unique(), file)
    .then(
      function (response) {
        return response;
      },
      function (error) {
        console.log(error); // Failure
      }
    );

  return promise;
};
