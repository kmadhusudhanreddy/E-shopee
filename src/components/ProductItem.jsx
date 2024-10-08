import React from "react";
import { useProducts } from "../store/Context";

const ProductItem = ({ item, quantity, price, onQuantityChange }) => {
  let { addCartProduct, setAddCartProduct } = useProducts();

  const qtyIncrease = () => {
    onQuantityChange(item.id, quantity + 1);
  };

  const qtyDecrease = () => {
    if (quantity === 1) return;
    onQuantityChange(item.id, quantity - 1);
  };

  function removeProduct(item) {
    const updatedCart = addCartProduct.filter(
      (product) => product.id !== item.id
    );
    setAddCartProduct(updatedCart); // Update the state with the new array
  }

  return (
    <div className="flex items-center gap-4 mb-5 border-b pb-4">
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col w-full">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-500">Price: ${price}</p>
        <div className="flex items-center gap-3 mt-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={qtyDecrease}
          >
            -
          </button>
          <span className="px-2">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={qtyIncrease}
          >
            +
          </button>
        </div>
      </div>

      <button
        className="ml-auto bg-red-500 text-white p-2 rounded-md"
        onClick={() => removeProduct(item)}
      >
        Remove
      </button>
    </div>
  );
};

export default ProductItem;
