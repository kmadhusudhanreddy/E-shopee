import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../store/Context";
import ProductSearch from "./ProductSearch";
import logo from "../images/logo.png";

const Navbar = () => {
  let { searchProducts, setSearchProducts } = useProducts();
  let [searchItem, setSearchItem] = useState("");
  let { addCartProduct } = useProducts();
  let { products } = useProducts();

  const [showProductSearch, setShowProductSearch] = useState(false);

  let navigate = useNavigate();

  function searchHandler() {
    let filteredproducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchItem.toLowerCase())
    );

    setSearchItem("");
    setSearchProducts(filteredproducts);

    if (filteredproducts.length > 0) {
      setShowProductSearch(true); // Show the ProductSearch component only if products are found
    }
  }

  function imageHandler() {
    navigate("/");
  }

  return (
    <div className="relative w-full h-16 bg-gray-800 flex items-center justify-between px-4 lg:px-8">
      {/* Logo */}
      <div className="w-1/4" onClick={imageHandler}>
        <img src={logo} alt="Logo" className="h-8 object-contain" />
      </div>

      {/* Search Bar */}
      <div className="flex-grow flex items-center justify-center">
        <input
          type="text"
          placeholder="Search Product"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="w-72 px-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div className="ml-2">
          <i
            className="ri-search-line text-white text-lg hover:text-blue-300"
            onClick={searchHandler}
          ></i>
        </div>
      </div>

      {/* Display ProductSearch only if showProductSearch is true */}
      {showProductSearch && (
        <ProductSearch setShowProductSearch={setShowProductSearch} />
      )}

      {/* Navigation Links */}
      <div className="hidden lg:flex space-x-6 text-white text-sm">
        <Link to="/" className="hover:text-blue-300">
          Home
        </Link>
        <Link to="/shop" className="hover:text-blue-300">
          Shop
        </Link>
        <Link to="/cart" className="relative inline-block hover:text-blue-300">
          Cart
          {addCartProduct.length > 0 && (
            <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {addCartProduct.length}
            </span>
          )}
        </Link>
        <Link to="/contactus" className="hover:text-blue-300">
          Contact Us
        </Link>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="lg:hidden">
        <button className="text-white">
          <i className="ri-menu-line text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
