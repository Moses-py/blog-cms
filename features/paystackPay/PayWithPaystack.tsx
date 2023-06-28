"use client";
import { useBlogStore } from "@/store/Blogstrore";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";

const PayWithPaystack = ({ amount, email }: any) => {
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
    publicKey: "pk_test_76e0c909a6534bfd37600b9bf51cb9b169219e60",
  };
  const initializePayment = usePaystackPayment(config);

  const [closeModal] = useBlogStore((state) => [state.closeModal]);

  const [disabled, setDisabled] = useState(false);

  // you can call this function anything
  const onSuccess = () => {
    // Implementation for whatever you want to do with reference and after success call.
    setDisabled(true);
    toast("Transaction successful..Thanks for your donation. Please wait...");

    setTimeout(() => {
      closeModal();
    }, 4000);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast("Transaction canceled...");
  };
  return (
    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
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
  );
};

export default PayWithPaystack;
