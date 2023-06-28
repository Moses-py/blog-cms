"use client";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <ClipLoader
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#6246EA"
      />
    </>
  );
};

export default Loader;
