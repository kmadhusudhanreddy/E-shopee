import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./store/Context";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductsProvider>
    <BrowserRouter>
      <Toaster /> {/* Self-closing Toaster component */}
      <App />
    </BrowserRouter>
  </ProductsProvider>
);
