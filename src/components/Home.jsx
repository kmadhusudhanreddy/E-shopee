import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Shop from "./Shop";
import Homeproducts from "./Homeproducts";
import Footer from "./Footer";
const Home = () => {
  return (
    <div className="h-auto overflow-hidden w-full">
      <Banner />
      <Homeproducts />
      <Footer />
    </div>
  );
};

export default Home;
