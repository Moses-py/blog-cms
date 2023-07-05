"use client";
import Image from "next/image";

const Loader = () => {
  return (
    <>
      <div className="container flex justify-center items-center h-[400px] bg-white">
        <Image src="/loader.webp" alt="loader" width={150} height={150} />
      </div>
    </>
  );
};

export default Loader;
