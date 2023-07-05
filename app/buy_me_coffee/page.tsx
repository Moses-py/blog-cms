"use client";
import { useBlogStore } from "@/store/Blogstrore";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import Image from "next/image";

const PayWithPaystack = () => {
  const config = {
    reference: new Date().getTime().toString(),
    email: "dantereus1@gmail.com",
    amount: 1000 * 100, // Paystack expects amount in kobo (smallest currency unit)
    publicKey: "pk_test_76e0c909a6534bfd37600b9bf51cb9b169219e60",
  };
  const initializePayment = usePaystackPayment(config);

  const [disabled, setDisabled] = useState(false);

  // you can call this function anything
  const onSuccess = () => {
    // Implementation for whatever you want to do with reference and after success call.
    setDisabled(true);
    toast("Transaction successful..Thanks for your donation. Please wait...");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast("Transaction canceled...");
  };
  return (
    <>
      <section className="w-full h-[50vh]  grid place-items-center bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-sky-500 to-sky-500">
        <div className="container w-full grid place-items-center">
          <div className="">
            <div>
              <button
                disabled={disabled}
                className={` ${
                  disabled ? "bg-gray-500" : "bg-black"
                } text-white font-sans text-[16px] px-[17px] py-[10px] rounded-md`}
                onClick={() => {
                  initializePayment(onSuccess, onClose);
                }}
              >
                Pay with paystack
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PayWithPaystack;
