import React from "react";
const CouponCode = () => {
  return (
    <div className="relative w-full max-w-md p-6 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg">
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">
          Festival Offer!
        </h2>
        <p className="text-lg font-medium mb-4">Get 20% off on all products</p>
        <span className="px-4 py-2 bg-black text-white font-semibold rounded-full cursor-pointer hover:bg-pink-700 transition-all duration-300">
          Use Code: FEST20
        </span>
      </div>
    </div>
  );
};

export default CouponCode;
