"use client";

import { Timeline } from "flowbite-react";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Admin() {
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      ["code-block"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block",
  ];

  return (
    <section className="p-4 font-sans">
      <div className="md:container">
        <div className="flex justify-between items-center mt-5 mb-[3rem]">
          <h1 className="divide-y text-2xl ">Add a blog content</h1>
          <button className="py-2 px-5 text-white bg-blue-600 hover:bg-blue-500 rounded-md">
            Save
          </button>
        </div>

        <Timeline>
          {/* Author */}
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="text-md font-sans">
                  Author
                </label>

                <label
                  htmlFor="label_description"
                  className="text-xs text-gray-400 font-sans"
                >
                  Who is the author of this post?
                </label>
                <input
                  type="text"
                  className="block border-gray-300 border w-full placeholder:text-xs placeholder:text-gray-300 text-xs"
                  placeholder="Author name"
                />
              </div>
            </Timeline.Content>
          </Timeline.Item>
          {/* Date */}
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="text-md font-sans">
                  Date of post
                </label>
                <label
                  htmlFor="date_description"
                  className="text-xs text-gray-400 font-sans"
                >
                  What is the published date you would like to show for this
                  post?
                </label>
                <input
                  type="date"
                  className="block border-gray-300 border w-full placeholder:text-xs placeholder:text-gray-300 text-xs"
                  placeholder="Date of post"
                />
              </div>
            </Timeline.Content>
          </Timeline.Item>
          {/* Title */}
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="text-md font-sans">
                  Title
                </label>
                <label
                  htmlFor="title_description"
                  className="text-xs text-gray-400 font-sans"
                >
                  What is the title of your post?
                </label>
                <input
                  type="text"
                  className="block border-gray-300 border w-full placeholder:text-xs placeholder:text-gray-300 text-xs"
                  placeholder="Name the title of your post"
                />
              </div>
            </Timeline.Content>
          </Timeline.Item>
          {/* Tag line */}
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="text-md font-sans">
                  Tag line
                </label>
                <label
                  htmlFor="label_description"
                  className="text-xs text-gray-400 font-sans"
                >
                  Do you have a subtitle or a tag line for your post?
                </label>
                <input
                  type="text"
                  className="block border-gray-300 border w-full placeholder:text-xs placeholder:text-gray-300 text-xs"
                  placeholder="Subtitle or tagline"
                />
              </div>
            </Timeline.Content>
          </Timeline.Item>
          {/* Slug */}
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="text-md font-sans">
                  Slug
                </label>
                <label
                  htmlFor="label_description"
                  className="text-xs text-gray-400 font-sans"
                >
                  Select a slug for this blog post, such as post-1, post-2, etc.
                </label>
                <input
                  type="text"
                  className="block border-gray-300 border w-full placeholder:text-xs placeholder:text-gray-300 text-xs"
                  placeholder="Slug e.g post-1"
                />
              </div>
            </Timeline.Content>
          </Timeline.Item>
          {/* Image */}
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="text-md font-sans">
                  Cover image
                </label>
                <label
                  htmlFor="label_description"
                  className="text-xs text-gray-400 font-sans"
                >
                  Got a nice image for your post?
                </label>
                <div>
                  <button
                    type="button"
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:border-blue-500"
                    onClick={() => {
                      imagePickerRef.current?.click();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    Upload image
                  </button>

                  <input type="file" hidden ref={imagePickerRef} />
                </div>
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
    </section>
  );
}
