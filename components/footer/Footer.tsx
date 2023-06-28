"use client";

import { blog_category } from "@/mocks/mocks";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="w-full py-[6rem] px-8">
        <div className="md:container">
          <div className="flex flex-col lg:flex-row gap-x-[2rem] gap-y-[4rem]">
            {/* General */}
            <div className="flex flex-col gap-[1.5rem] text-left ">
              <div className="text-left">
                <h1 className="divide-x font-sans font-bold text-[#001858] text-3xl inline">
                  flai-r
                </h1>
                <span>.</span>
                <span className="text-primary font-bold text-sm">Blog</span>
              </div>
              <p className="text-[20px] font-serif font-semibold leading-tight w-2/3">
                Blog created and maintained by Moses Chukwunekwu. 2023
              </p>
              <div className="flex gap-4">
                <Image
                  src={"/icons/github.svg"}
                  alt="github_icon"
                  width={20}
                  height={20}
                />
                <Image
                  src={"/icons/instagram.svg"}
                  alt="github_icon"
                  width={20}
                  height={20}
                />
                <Image
                  src={"/icons/linkedin.svg"}
                  alt="github_icon"
                  width={20}
                  height={20}
                />
                <Image
                  src={"/icons/twitter.svg"}
                  alt="github_icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-[3rem] lg:gap-[4rem] lg:text-right">
              {/* Category */}
              <div className="flex flex-col gap-[1rem] ">
                <h1 className="font-serif text-[24px] font-bold">Category</h1>
                <ul className="flex flex-col gap-2">
                  {blog_category.map((category, index) => {
                    return (
                      <li key={index}>
                        <Link href="" className="text-[16px] font-sans">
                          {category}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* About */}
              <div className="flex flex-col gap-[1rem] ">
                <h1 className="font-serif text-[24px] font-bold">About us</h1>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link href="" className="text-[16px] font-sans">
                      Flai-r agency
                    </Link>
                  </li>
                  <li>
                    <Link href="" className="text-[16px] font-sans">
                      Moses Chukwunekwu
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Contact */}
              <div className="flex flex-col gap-[1rem] ">
                <h1 className="font-serif text-[24px] font-bold">
                  Get in touch
                </h1>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      href="tel:+2349069885063"
                      className="text-[16px] font-sans"
                    >
                      +2349069885063
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="mailto:dantereus1@gmail.com"
                      className="text-[16px] font-sans"
                    >
                      dantereus1@gmail.com
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Follow */}
              <div className="flex flex-col gap-[1rem] ">
                <h1 className="font-serif text-[24px] font-bold">Follow us</h1>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link href="" className="text-[16px] font-sans">
                      Linkedin
                    </Link>
                  </li>
                  <li>
                    <Link href="" className="text-[16px] font-sans">
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link href="" className="text-[16px] font-sans">
                      Twitter
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
