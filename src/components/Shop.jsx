import { useProducts } from "../store/Context";
import Category from "./Category";
import Loading from "./Loading";
import Products from "./Products";
import CouponCode from "./CouponCode";
import { API } from "../Api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect } from "react";

const Shop = () => {
  const { products, categoryProduct, setCategoryProduct } = useProducts();

  // Call useFetch here so it can update products based on categoryProduct
  useFetch(categoryProduct);

  return (
    <div
      className="flex overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <Category />
      <div className="w-full flex flex-col space-y-10 overflow-y-auto p-4">
        <CouponCode />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
          {products.length === 0 ? (
            <Loading />
          ) : (
            products.map((product, index) => (
              <Products key={index} product={product} />
            ))
          )}
          {/* Add this div to create space at the bottom */}
          <div className="col-span-full mb-100"></div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
