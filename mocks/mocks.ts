export const form_data = [
  {
    label: "Title",
    description: "What is the title of your post?",
    placeholder: "Name the title of your post",
    type: "text",
    name: "title",
    required: true,
  },
  {
    label: "Slug",
    description:
      "Select a slug for this blog post, such as post-1, post-2, etc.",

    placeholder: "Slug e.g post-1",
    type: "text",
    name: "slug",
    required: true,
  },
  {
    label: "Cover image",
    description: "Got a nice image for your post?",
    placeholder: "Select an image",
    type: "file",
    name: "cover",
    required: false,
  },
];

export const blog_category = [
  "",
  "Technology",
  "Art",
  "Finance",
  "Games",
  "Internet",
  "Clothing",
  "Wildlife",
];
