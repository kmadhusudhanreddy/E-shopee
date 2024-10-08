import { useProducts } from "../store/Context";
import { Navigate, useNavigate } from "react-router-dom";
const ProductSearch = ({ setShowProductSearch }) => {
  let { searchProducts } = useProducts();
  let navigate = useNavigate();

  function productDetailHandler(product) {
    setShowProductSearch(false);
    navigate(`/productDetails/${product.id}`);
  }
  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-6/10 max-h-60 overflow-y-scroll flex flex-col bg-white p-4 shadow-lg rounded-md">
      {/* Close Button */}
      <button
        onClick={() => setShowProductSearch(false)} // Hide the ProductSearch component
        className=" w-[10%]  mb-4 top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        X
      </button>

      {searchProducts.length > 0 ? (
        searchProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center mb-4"
            onClick={() => productDetailHandler(product)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-12 h-12 mr-3"
            />
            <div>
              <p className="text-sm font-semibold">{product.title}</p>
              <p className="text-sm">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductSearch;
