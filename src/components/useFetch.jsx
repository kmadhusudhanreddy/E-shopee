import { useEffect } from "react";
import { useProducts } from "../store/Context";
import { API } from "../Api";
const useFetch = (categoryProduct) => {
  const { setProducts } = useProducts();

  useEffect(() => {
    const fetchCategoryData = async () => {
      let URL = "";

      if (categoryProduct === "men" || categoryProduct === "women") {
        URL = `${API}/category/${categoryProduct}'s clothing`; // Adjust URL as needed
      } else {
        URL = `${API}/category/${categoryProduct}`;
      }

      try {
        let response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Error in fetching data" + response.status);
        }
        let products = await response.json();
        setProducts(products);
        // console.log(products);
      } catch (error) {
        console.log("Error in fetching data" + error);
      }
    };

    if (categoryProduct) {
      fetchCategoryData();
    }
  }, [categoryProduct, setProducts]);
};

export default useFetch;
