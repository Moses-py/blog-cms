"use client";
import Image from "next/image";
import Link from "next/link";
type Props = {
  name: string;
  image: string;
};

const CatCard = ({ name, image }: Props) => {
  return (
    <>
      <Link href={`/category/${name.toLowerCase()}`}>
        <div className="relative min-w-[185px] w-[185px] h-[185px] hover:h-[200px] hover:border-gray-200 hover:border hover:scale-y-105 transition-all ease-linear duration-300">
          <Image
            src={`/${image}.jpg`}
            alt={name}
            width={185}
            height={185}
            className="object-cover min-w-full w-full h-full absolute inset-0 z-10"
          />
          <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-30">
            <p className="font-bold font-serif text-white text-xl">
              {name.toUpperCase()}
            </p>
          </div>
          <div className="absolute inset-0 bg-black opacity-30 z-20" />
        </div>
      </Link>
    </>
  );
};

export default CatCard;
