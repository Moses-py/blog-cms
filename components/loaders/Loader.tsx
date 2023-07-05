"use client";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div className="container flex justify-center items-center h-[400px] bg-gray-100">
        <HashLoader
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          color="#6246EA"
        />
      </div>
    </>
  );
};

export default Loader;
