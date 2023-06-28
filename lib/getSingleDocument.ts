import { listDocs } from "./listDocuments";

export const getDocument = async () => {
  const blog_slug = await listDocs();

  const filtered_blog_slug = blog_slug?.documents.map((docs) => {
    return {
      slug: docs.slug,
    };
  });

  return filtered_blog_slug;
};
