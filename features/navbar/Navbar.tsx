/* eslint-disable @next/next/no-img-element */
"use client";
import { useBlogStore } from "@/store/Blogstrore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const Navbar = () => {
  const [openBar, setOpenBar] = useState(false);
  const [openModal] = useBlogStore((state) => [state.openModal]);
  return (
    <>
      <nav className="p-5 divide-x divide-gray-300 font-sans">
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
          <ul className="hidden sm:flex justify-between items-center gap-6 text-[14px] font-semibold text-gray-600">
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
              <button
                className="bg-[#6246EA] px-[17px] py-[10px] flex gap-[10px] text-white rounded-md"
                onClick={openModal}
              >
                Buy me a coffee
              </button>
            </li>
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
              <li className="mb-1" onClick={() => setOpenBar(false)}>
                <Link
                  className="block p-4 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-gray-800 rounded"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="mb-1" onClick={() => setOpenBar(false)}>
                <Link
                  className="block p-4 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-gray-800 rounded"
                  href="/blogs"
                >
                  Categories
                </Link>
              </li>
              <li className="mb-1" onClick={() => setOpenBar(false)}>
                <Link
                  className="block p-4 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-gray-800 rounded"
                  href="https://flai-r.vercel.app/"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-1" onClick={() => setOpenBar(false)}>
                <button
                  className="bg-[#6246EA] px-[17px] py-[10px] flex gap-[10px] text-white rounded-md"
                  onClick={openModal}
                >
                  Buy me a coffee
                </button>
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
