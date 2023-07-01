type InputData = {
  author: string;
  date: Date;
  tag?: string;
  summary: string;
  slug: string;
  cover?: File;
  content: string;
  title: string;
  minutes: string;
};

type Input = {
  label: string;
  description: string;
  placeholder: string;
  type: string;
  name: string;
  register?: UseFormRegister<FieldValues>;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
  disabled?: boolean;
};

interface Image {
  bucketId: string;
  fileId: string;
}

type BlogList = {
  slug: string;
  content: string;
  image?: URL;
  category: string;
  date: string;
  title: string;
  summary: string;
  minutes: string;
};

type CommentProps = {
  comments: Comment[];
};

type Comment = {
  fileId: string;
  author: string;
  content: string;
  replies: CommentReply[];
};

type CommentReply = {
  author: string;
  id: string;
  content: string;
};
