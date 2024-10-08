import { useProducts } from "../store/Context";

import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Products = ({ product, key }) => {
  // Function to trim text to a specified length

  let navigate = useNavigate();

  const trimText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  let { products } = useProducts();

  let { addCartProduct, setAddCartProduct } = useProducts();

  function addToCartHandler(product) {
    let productItem = product;
    setAddCartProduct((prevProduct) => [...prevProduct, productItem]);
    toast.success("Product added to cart!");
    console.log(addCartProduct);
  }

  function productDetailHandler(product) {
    console.log(product);

    console.log("product id is" + product.id);

    navigate(`/productDetails/${product.id}`);
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      {" "}
      {/* Remove fixed height */}
      {/* Product Image */}
      <div onClick={() => productDetailHandler(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover" // Maintain aspect ratio for images
        />
        <div className="p-4">
          {/* Product Title (trimmed to 30 characters) */}
          <h2 className="text-lg font-semibold mb-1">
            {trimText(product.title, 30)}
          </h2>
          {/* Product Description (trimmed to 50 characters) */}
          <p className="text-gray-600 mb-2">
            {trimText(product.description, 50)}
          </p>
          {/* Product Price */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-gray-800">
              ${product.price}
            </span>

            {/* Product Rating */}
            <span className="text-yellow-500">
              {Array(Math.round(product.rating.rate))
                .fill()
                .map((_, i) => (
                  <i key={i} className="ri-star-fill"></i>
                ))}
              <span className="text-gray-500 text-sm">
                {" "}
                ({product.rating.count})
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full "
          onClick={() => {
            addToCartHandler(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
