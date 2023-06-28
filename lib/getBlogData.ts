import { getImage } from "./getImageData";
import { listDocs } from "./listDocuments";

export const getBlogData = async () => {
  const blog_docs = await listDocs();

  const filtered_blog_data = blog_docs?.documents.map((docs) => {
    const { bucketId, fileId } = JSON.parse(docs.image);
    let image = getImage(bucketId, fileId);
    return {
      slug: docs.slug,
      content: docs.content,
      title: docs.title,
      image: image,
      category: docs.category,
      date: docs.date,
      summary: docs.summary,
    };
  });

  return filtered_blog_data;
};
