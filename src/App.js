import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Contactus from "./components/Contactus";
import { ProductsProvider } from "./store/Context";
import ProductDetails from "./components/ProductDetails";
import Order from "./components/Order";

function App() {
  return (
    <div className="App overflow-hidden">
      <ProductsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/shop" element={<Shop />}></Route>

          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/contactus" element={<Contactus />}></Route>
          <Route
            path="/productDetails/:productid"
            element={<ProductDetails />}
          ></Route>
          <Route path="/order" element={<Order />}></Route>
        </Routes>
      </ProductsProvider>
    </div>
  );
}

export default App;
