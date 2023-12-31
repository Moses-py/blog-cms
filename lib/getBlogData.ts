import { getImage } from "./getImageData";
import { listDocs } from "./listDocuments";

export const getBlogData = async () => {
  const blog_docs = await listDocs();

  const filtered_blog_data = blog_docs?.documents.map((docs) => {
    if (docs.image) {
      const { bucketId, fileId } = JSON.parse(docs.image);
      let image = getImage(bucketId, fileId);
      return {
        id: docs.$id,
        slug: docs.slug,
        content: docs.content,
        title: docs.title,
        image: image,
        category: docs.category,
        date: docs.date,
        summary: docs.summary,
        minutes: docs.minutes,
      };
    } else {
      return {
        id: docs.$id,
        slug: docs.slug,
        content: docs.content,
        title: docs.title,
        category: docs.category,
        date: docs.date,
        summary: docs.summary,
        minutes: docs.minutes,
      };
    }
  });

  return filtered_blog_data;
};
