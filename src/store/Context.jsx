import { createContext, useContext, useEffect, useState } from "react";

import { API } from "../Api";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  let [products, setProducts] = useState([]);
  let [homeProducts, setHomeProducts] = useState([]);
  let [addCartProduct, setAddCartProduct] = useState([]);
  let [categoryProduct, setCategoryProduct] = useState("");

  const [quantities, setQuantities] = useState({});
  const [prices, setPrices] = useState({});

  let [coupon, setCoupon] = useState("FEST20");
  let [searchProducts, setSearchProducts] = useState([]);

  // Store the cart in local storage to persist the state across sessions
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartProducts"));
    const savedQuantities = JSON.parse(localStorage.getItem("cartQuantities"));
    const savedPrices = JSON.parse(localStorage.getItem("cartPrices"));
    if (savedCart) setAddCartProduct(savedCart);
    if (savedQuantities) setQuantities(savedQuantities);
    if (savedPrices) setPrices(savedPrices);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(addCartProduct));
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));
    localStorage.setItem("cartPrices", JSON.stringify(prices));
  }, [addCartProduct, quantities, prices]);

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));

    const product = addCartProduct.find((item) => item.id === productId);
    setPrices((prevPrices) => ({
      ...prevPrices,
      [productId]: newQuantity * product.price.toFixed(2),
    }));
  };

  async function fetchProducts() {
    try {
      let response = await fetch(API);
      if (!response.ok) {
        throw new Error("Error in fetching data" + response.status);
      }
      let products = await response.json();
      setProducts(products);
      setHomeProducts(products);
      // console.log(products);
    } catch (error) {
      console.log("Error in fetching data" + error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        categoryProduct,
        setCategoryProduct,
        addCartProduct,
        setAddCartProduct,
        quantities,
        prices,
        handleQuantityChange,
        coupon,
        setCoupon,
        searchProducts,
        setSearchProducts,
        homeProducts,
        setHomeProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

//custom hook for easy access of data

export function useProducts() {
  return useContext(ProductsContext);
}
