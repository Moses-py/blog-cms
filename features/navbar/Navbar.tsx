/* eslint-disable @next/next/no-img-element */
"use client";
import { getApiUrl } from "@/config";
import { useBlogStore } from "@/store/Blogstrore";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PiUserThin } from "react-icons/pi";
import { useEffectOnce } from "usehooks-ts";

const Navbar = () => {
  const [openBar, setOpenBar] = useState(false);
  const [user, create_user, logout_user, get_user] = useBlogStore((state) => [
    state.user,
    state.create_user,
    state.logout_user,
    state.get_user,
  ]);

  const [showSignOut, setShowSignout] = useState(false);

  const router = usePathname();

  function handleSignIn() {
    const url = getApiUrl();
    create_user(`${url}/${router}`);
  }

  function handleSignout() {
    setShowSignout(false);
    logout_user;
  }

  useEffectOnce(() => {
    get_user();
  });

  return (
    <>
      <nav className="px-5 py-8 divide-x divide-gray-300 font-sans">
        <div className="md:container flex justify-between items-center">
          <div className="">
            <h1 className="divide-x font-sans font-bold text-[#001858] text-3xl inline">
              flai-r
            </h1>
            <span>.</span>
            <span className="text-primary font-bold text-sm">Blog</span>
          </div>
          {/* Action button */}
          <div className="lg:hidden">
            <button
              className="navbar-burger flex items-center text-gray-800 p-3"
              onClick={() => setOpenBar(true)}
            >
              <Image
                src={"/icons/menu.svg"}
                alt="menu_icon"
                width={25}
                height={25}
              />
            </button>
          </div>
          <ul className="hidden lg:flex justify-between items-center gap-6 text-[14px] font-semibold text-gray-600">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/blogs"}>All posts</Link>
            </li>
            <li>
              <Link href={"https://flai-r.vercel.app/"} target="__blank">
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/buy_me_coffee"
                className="py-4 text-gray-800 text-sm font-semibold"
              >
                Buy me a coffee
              </Link>
            </li>
            {user.name === undefined ? (
              <li
                onClick={handleSignIn}
                className="flex gap-2 items-center cursor-pointer"
              >
                <PiUserThin className="text-3xl" />
                <div className="flex flex-col">
                  <span className="text-gray-800 font-sans text-xs">
                    Guest (current)
                  </span>
                  <span className="text-gray-800 font-sans text-xs">
                    Sign in/Sign up
                  </span>
                </div>
              </li>
            ) : (
              <li className="flex items-center cursor-pointer text-gray-800 relative">
                <PiUserThin className="text-3xl" />
                <div className=" w-full">
                  {showSignOut && (
                    <button
                      className="block text-gray-800 font-sans text-sm font-semibold px-[17px] py-[10px] border border-gray-300 rounded-md absolute top-[30px] z-50 bg-white w-full left-0"
                      onClick={() => logout_user()}
                    >
                      Sign out
                    </button>
                  )}
                  <span
                    className="text-gray-800 font-sans text-sm font-semibold"
                    onClick={() => setShowSignout(!showSignOut)}
                  >
                    {user.name && user.name}
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {/* Mobile */}
      <div className={`relative z-50 ${openBar ? "block" : "hidden"}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link className="mr-auto text-3xl font-bold" href="/">
              <div className="">
                <h1 className="divide-x font-sans font-bold text-[#001858] text-3xl inline">
                  flai-r
                </h1>
                <span>.</span>
                <span className="text-primary font-bold text-sm font-sans">
                  Blog
                </span>
              </div>
            </Link>
            <button className="navbar-close" onClick={() => setOpenBar(false)}>
              <svg
                className="h-6 w-6 text-gray-800 cursor-pointer hover:bg-gradient-to-r hover:from-orange-700 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul className="font-sans">
              {user.name === undefined ? (
                <li
                  onClick={handleSignIn}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <PiUserThin className="text-3xl" />
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-sans text-xs">
                      Guest (current)
                    </span>
                    <span className="text-gray-800 font-sans text-xs">
                      Sign in/Sign up
                    </span>
                  </div>
                </li>
              ) : (
                <li className="flex items-center cursor-pointer text-gray-800 relative">
                  <PiUserThin className="text-3xl" />
                  <div className=" w-full">
                    {showSignOut && (
                      <button
                        className="block text-gray-800 font-sans text-sm font-semibold px-[17px] py-[10px] border border-gray-300 rounded-md absolute top-[30px] z-50 bg-white w-full left-0"
                        onClick={handleSignout}
                      >
                        Sign out
                      </button>
                    )}
                    <span
                      className="text-gray-800 font-sans text-sm font-semibold"
                      onClick={() => setShowSignout(!showSignOut)}
                    >
                      {user.name}
                    </span>
                  </div>
                </li>
              )}
              <li className="mb-1" onClick={() => setOpenBar(false)}>
                <Link
                  className="block py-4 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-gray-800 rounded"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="mb-1" onClick={() => setOpenBar(false)}>
                <Link
                  className="block py-4 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-gray-800 rounded"
                  href="/blogs"
                >
                  All blogs
                </Link>
              </li>
              <li className="mb-1" onClick={() => setOpenBar(false)}>
                <Link
                  className="block py-4 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-gray-800 rounded"
                  href="https://flai-r.vercel.app/"
                >
                  About Us
                </Link>
              </li>

              <li onClick={() => setOpenBar(false)}>
                <Link
                  href="/buy_me_coffee"
                  className="py-4 text-gray-800 text-sm font-semibold"
                >
                  Buy me a coffee
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <div className="flex justify-between items-center gap-5">
                <Link href={"https://github.com/moses-py/"} target="__blank">
                  <Image
                    src={"/icons/github.svg"}
                    alt="github_icon"
                    width={20}
                    height={20}
                  />
                </Link>

                <Link
                  href={
                    "https://www.linkedin.com/in/moses-chukwunekwu-717304163/"
                  }
                  target="__blank"
                >
                  {" "}
                  <Image
                    src={"/icons/linkedin.svg"}
                    alt="github_icon"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link href={"https://flai-r.vercel.app/"} target="__blank">
                  {" "}
                  <Image
                    src={"/icons/globe.svg"}
                    alt="globe_icon"
                    width={20}
                    height={20}
                  />
                </Link>
              </div>
            </div>
            <p className="my-4 text-xs text-center text-gray-800">
              <span className="text-md">Copyright © 2023</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
