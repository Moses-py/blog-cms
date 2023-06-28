import { storage } from "@/appwrite";

export const getImage = async (bucketId: string, fileId: string) => {
  const result = storage.getFileView(bucketId, fileId);
  return result;
};
