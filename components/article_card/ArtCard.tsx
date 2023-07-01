"use client";
import Link from "next/link";
import NoImage from "../misc/NoImage";

type Props = {
  image?: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  slug: string;
  minutes: string;
};

const ArtCard = ({
  image,
  category,
  date,
  title,
  summary,
  slug,
  minutes,
}: Props) => {
  return (
    <>
      <div className="px-5 py-8 bg-white flex flex-col gap-[1rem] font-sans h-full w-full border border-gray-200">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={"article_image"}
            className="max-w-full max-h-full w-full h-auto"
          />
        ) : (
          <NoImage />
        )}
        <div className="flex flex-col gap-[1.2rem]">
          <div className="flex justify-between items-center">
            <p className="text-primary text-[12px]">#{category}</p>
            <p className="text-gray-400 text-[12px]">{minutes} minutes read</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[20px] lg:text-[24px] xl:text-[28px] leading-tight font-serif font-bold ">
              {title}
            </h1>
            <p className="text-gray-600 text-[14px]">{summary}</p>
          </div>
          <div className="flex justify-between items-center">
            <button className="text-white font-sans text-[16px] px-[25px] py-[10px] bg-black hover:bg-gray-800">
              <Link href={`/post/${slug}`}>Read more</Link>
            </button>
            <p className="text-gray-400 text-[12px]">{date}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtCard;
