import React from "react";

function CheckOrder({ color, mess, refreshFn }) {


  return (
    <div className="grid grid-cols-12">
      <div
        style={{backgroundColor : color}}
        className={`col-span-10 w-full text-center px-3 text-white font-bold py-3 rounded-lg shadow-md transition duration-300`}
      >
        {mess}
      </div>
      <div
      onClick={() => refreshFn()} 
      className="col-span-2 flex items-center ml-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    </div>
  );
}

export default CheckOrder;
