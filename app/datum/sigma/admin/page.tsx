"use client";

// Library imports
import { Label, Select, Timeline } from "flowbite-react";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { ID, database } from "@/appwrite";
import { toast } from "react-toastify";

// Style imports
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

// Util imports
import { blog_category, form_data } from "@/mocks/mocks";
import { uploadImage } from "@/lib/uploadImage";
import formatDate from "@/lib/getCurrentDate";

// Component imports
import Input from "@/components/inputs/Input";
import { formats, modules } from "@/lib/utils";

export default function Admin() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Technology");

  const { register, handleSubmit } = useForm();

  const submitData: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    if (content !== "") {
      setLoading(true);
      setContent("");
      setCategory("");
      toast("Adding Post");
      try {
        let image: Image | undefined;
        const fileUpload = await uploadImage(file);

        if (fileUpload) {
          image = {
            bucketId: fileUpload.bucketId,
            fileId: fileUpload.$id,
          };
        }

        const parse_data = {
          ...data,
          content: content,
          category: category,
          date: formatDate(new Date()),
          ...(image && { image: JSON.stringify(image) }),
        };

        const { $id } = await database.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
          ID.unique(),
          { ...parse_data }
        );

        if ($id) {
          setFile(undefined);
          setLoading(false);
          toast("Post successfully added");
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      toast("Your post needs a content");
    }
  };

  return (
    <>
      <section className="p-4 font-sans">
        <form onSubmit={handleSubmit(submitData)}>
          <div className="md:container">
            <div className="flex justify-between items-center mt-5 mb-[3rem]">
              <h1 className="divide-y text-2xl ">Add a blog content</h1>
              <button
                type="submit"
                className="py-2 px-5 text-white bg-blue-600 hover:bg-blue-500 rounded-md"
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </div>

            <Timeline>
              {form_data.map((data, index) => {
                if (data.type === "file") {
                  return (
                    <>
                      <Input
                        label={data.label}
                        description={data.description}
                        placeholder={data.placeholder}
                        type={data.type}
                        key={index + "a"}
                        name={data.name}
                        onchange={(e: any) => setFile(e.target.files[0])}
                      />
                    </>
                  );
                } else {
                  return (
                    <>
                      <Input
                        label={data.label}
                        description={data.description}
                        placeholder={data.placeholder}
                        type={data.type}
                        key={index + "f"}
                        register={register}
                        name={data.name}
                        required={data.required}
                      />
                    </>
                  );
                }
              })}
              <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                  <div className="max-w-full" id="select">
                    <div className="mb-2 flex flex-col gap-3">
                      <Label
                        htmlFor="category"
                        className="text-md font-sans font-normal"
                        value="Choose a category"
                      />
                      <Label
                        htmlFor="category_description"
                        className="text-xs text-gray-400 font-sans"
                        value="What category does you post most aligns with?"
                      />
                    </div>
                    <Select
                      id="category"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="rounded-none"
                    >
                      {blog_category.map((category, index) => {
                        return (
                          <option className="bg-white" key={index}>
                            {category}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                </Timeline.Content>
              </Timeline.Item>
              {/* Content */}
              <Timeline.Item>
                <Timeline.Point />
                <Timeline.Content>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="" className="text-md font-sans">
                      Content
                    </label>
                    <label
                      htmlFor="label_description"
                      className="text-xs text-gray-400 font-sans"
                    >
                      Write your blog post!
                    </label>

                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      formats={formats}
                      className=" border-gray-300 h-[300px] rounded-lg"
                    />
                  </div>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
          </div>
        </form>
      </section>
    </>
  );
}
