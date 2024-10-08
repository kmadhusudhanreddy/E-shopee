import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../Api"; // Adjust this path based on your project structure
import Loading from "./Loading"; // Assuming you have a loading component

const ProductDetails = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API}/${productid}`);
        if (!response.ok) {
          throw new Error("Error fetching product details: " + response.status);
        }
        const productDetails = await response.json();
        setProduct(productDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productid]);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return <Loading />; // Show loading component while fetching
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Show error message
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <button
        onClick={handleBackClick}
        className="bg-blue-500 text-white rounded-md px-4 py-2 mb-4 hover:bg-blue-600 transition duration-200"
      >
        &lt; Back
      </button>
      {product && (
        <div className="border border-gray-300 rounded-lg p-4 shadow-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
          <p className="text-gray-700 mt-1">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 italic mt-1">{product.category}</p>
          <p className="text-gray-500 mt-1">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
