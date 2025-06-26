import React from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

function CustomButton({ label, onClick, variant,  isLoading, type }) {
  return (
    <div className="w-full flex items-end justify-end">
      <button
        type={type}
        onClick={onClick}
        className={`${variant} px-4 py-2 w-full font-medium  flex items-center justify-center gap-4  rounded-lg border border-indigo-500 hover:bg-indigo-500 focus:bg-indigo-500 hover:text-white transition-all duration-500 cursor-pointer mt-8 ease-in-out focus:ring-2 focus:ring-indigo-600 `}
      >
        {isLoading ? <CgSpinnerTwoAlt className="animate-spin" /> : label}
      </button>
    </div>
  );
}

export default CustomButton;
