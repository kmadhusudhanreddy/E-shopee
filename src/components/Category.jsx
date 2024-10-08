import React, { useState } from "react";
import { useProducts } from "../store/Context";
import useFetch from "./useFetch";
import { useEffect } from "react";

const Category = () => {
  let { categoryProduct, setCategoryProduct } = useProducts();

  const [category, setCategory] = useState([
    "Men",
    "Women",
    "Jewelery",
    "Electronics",
  ]);

  // Track the selected category
  const [activeCategory, setActiveCategory] = useState("");

  const handleCategoryClick = (categoryItem) => {
    setCategoryProduct(categoryItem.toLowerCase());
    console.log(categoryItem);

    setActiveCategory(categoryItem); // Update active category
  };

  //custom Hooks cannot be called inside Functions
  // useFetch(categoryProduct);

  return (
    <div className="w-1/8 h-[calc(100vh-4rem)] p-7 flex flex-col justify-start bg-gray-500">
      {category.map((item, index) => (
        <div
          key={index}
          className={`p-2 mb-3 text-white font-semibold text-center rounded-sm cursor-pointer transition duration-200 ${
            activeCategory === item
              ? "bg-blue-500"
              : "bg-gray-600 hover:bg-gray-700"
          }`}
          onClick={() => handleCategoryClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Category;
