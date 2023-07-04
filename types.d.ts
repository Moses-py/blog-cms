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
  id: string;
  slug: string;
  content: string;
  image?: URL;
  category: string;
  date: string;
  title: string;
  summary: string;
  minutes: string;
};

type User = {
  name: string | undefined;
  id: string | undefined;
};

type BlogComment = {
  id: string;
  fileId: string;
  userId: string;
  content: string;
  author: string;
  time: string;
  date: string;
  likes?: number;
  replies?: Reply[] | undefined;
};

type Reply = {
  author: string;
  content: string;
  time: string;
  date: string;
  likes?: number;
};
