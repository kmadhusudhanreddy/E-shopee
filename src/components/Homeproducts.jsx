import React from "react";
import { useProducts } from "../store/Context";
import Products from "./Products";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
const Homeproducts = () => {
  const { homeProducts, setHomeProducts } = useProducts();

  return (
    <div className="flex overflow-hidden">
      <div className="w-full flex flex-col space-y-10   p-5 h-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5  mx-10">
          {homeProducts.length === 0 ? (
            <Loading />
          ) : (
            homeProducts.map((product, index) => (
              <Products
                key={index}
                product={product}
                // Remove the event 'e'
              />
            ))
          )}
          {/* Add this div to create space at the bottom */}
          <div className="col-span-full mb-100"></div>
        </div>
      </div>
    </div>
  );
};

export default Homeproducts;
