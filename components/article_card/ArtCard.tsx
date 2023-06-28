"use client";
type Props = {
  image?: string;
  category: string;
  date: string;
  title: string;
  summary: string;
};

const ArtCard = ({ image, category, date, title, summary }: Props) => {
  return (
    <>
      <div className="px-5 py-8 bg-white flex flex-col gap-[1rem] font-sans h-full w-full border border-gray-200">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={"article_image"}
            className="max-w-full max-h-full w-full h-auto"
          />
        )}
        <div className="flex flex-col gap-[1.2rem]">
          <div className="flex justify-between items-center">
            <p className="text-primary text-[12px]">#{category}</p>
            <p className="text-gray-400 text-[12px]">Moses Chukwunekwu</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[24px] lg:text-[30px] xl:text-[32px] leading-tight font-serif font-bold ">
              {title}
            </h1>
            <p className="text-gray-600 text-[14px]">{summary}</p>
          </div>
          <div className="flex justify-between items-center">
            <button className="px-[10px] py-[8px] bg-black text-white">
              Read more
            </button>
            <p className="text-gray-400 text-[12px]">{date}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtCard;
