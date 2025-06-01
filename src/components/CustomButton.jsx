import React from "react";

function CustomButton({ label, onClick, variant,  isLoading, type }) {
  return (
    <div className="w-full flex items-end justify-end">
      <button
        type={type}
        onClick={onClick}
        className={`${variant} px-4 py-2 w-full  rounded-lg border border-indigo-500 hover:bg-indigo-500 transition-all duration-500 cursor-pointer mt-8 ease-in-out focus:ring-2 focus:ring-indigo-600 text-white`}
      >
        {isLoading ? "isLoading..." : label}
      </button>
    </div>
  );
}

export default CustomButton;
