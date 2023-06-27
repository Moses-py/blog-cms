"use client";

import Input from "@/components/inputs/Input";
import { Timeline } from "flowbite-react";
import { useState } from "react";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { formats, modules } from "@/lib/utils";
import { form_data } from "@/mocks/mocks";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "@/lib/uploadImage";
import { ID, database } from "@/appwrite";

export default function Admin() {
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | undefined>();

  const { register, handleSubmit } = useForm();

  const submitData: SubmitHandler<FieldValues> = async (data: FieldValues) => {
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
      content: value,
      ...(image && { image: JSON.stringify(image) }),
    };

    const { $id } = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      { ...parse_data }
    );

    console.log($id);
  };

  return (
    <section className="p-4 font-sans">
      <form onSubmit={handleSubmit(submitData)}>
        <div className="md:container">
          <div className="flex justify-between items-center mt-5 mb-[3rem]">
            <h1 className="divide-y text-2xl ">Add a blog content</h1>
            <button
              type="submit"
              className="py-2 px-5 text-white bg-blue-600 hover:bg-blue-500 rounded-md"
            >
              Save
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
                      key={index}
                      name={data.name}
                      onchange={(e: any) => setFile(e.target.files[0])}
                    />
                  </>
                );
              } else {
                return (
                  <Input
                    label={data.label}
                    description={data.description}
                    placeholder={data.placeholder}
                    type={data.type}
                    key={index}
                    register={register}
                    name={data.name}
                  />
                );
              }
            })}
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
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                  />
                </div>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      </form>
    </section>
  );
}
