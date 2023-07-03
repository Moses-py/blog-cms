"use client";

import { useBlogStore } from "@/store/Blogstrore";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { ClipLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import { getApiUrl } from "@/config";

const SigninModal = () => {
  const [toggleModal, create_user] = useBlogStore((state) => [
    state.toggleModal,
    state.create_user,
  ]);

  const [loading, setLoading] = useState(false);

  const router = usePathname();

  function handleAuthSignIn() {
    setLoading(true);
    const url = getApiUrl();
    create_user(`${url}/${router}`);
  }
  return (
    <>
      <div
        className={`fixed inset-0 bg-white/30 grid place-items-center z-50 backdrop-blur-md p-5`}
      >
        <div className="bg-white rounded-xl p-5 border border-gray-300 text-gray-800">
          <div className="flex justify-end mb-4">
            <GrClose onClick={toggleModal} className="hover:cursor-pointer" />
          </div>
          <h6 className="text-xl font-bold text-center">Ooops!</h6>
          <p className="text-center text-xl lg:text-2xl font-extralight font-sans my-3">
            Looks like you&apos;re not signed in to our blog!
          </p>
          <p className="text-center text-xl lg:text-2xl font-extralight font-sans my-3">
            Please sign in to join the discussion board
          </p>

          <div className="flex justify-center py-5">
            <button
              type="button"
              className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2"
              onClick={handleAuthSignIn}
            >
              {loading ? (
                <>
                  <ClipLoader color="white" size={25} className="mr-3" />
                </>
              ) : (
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
              )}
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninModal;
