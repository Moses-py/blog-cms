"use client";
import PayWithPaystack from "@/features/paystackPay/PayWithPaystack";
import { useBlogStore } from "@/store/Blogstrore";
import Image from "next/image";
const PaystackModal = () => {
  const [closeModal] = useBlogStore((state) => [state.closeModal]);
  return (
    <>
      <section className="w-full h-[100dvh] bg-gray-100 fixed inset-0 z-50">
        <div className="container p-5 flex justify-between items-center">
          <div className="">
            <h1 className="divide-x font-sans font-bold text-[#001858] text-3xl inline">
              flai-r
            </h1>
            <span>.</span>
            <span className="text-primary font-bold text-sm">Blog</span>
          </div>

          <Image
            src="/icons/x.svg"
            alt="close"
            width={25}
            height={25}
            // className="absolute top-[1rem] right-[1rem] translate-x-[-1rem] translate-y-[1rem]"
            onClick={closeModal}
          />
        </div>

        <div className="container grid place-items-center">
          <PayWithPaystack email="dantereus1@gmail.com" amount={1000} />
        </div>
      </section>
    </>
  );
};

export default PaystackModal;
