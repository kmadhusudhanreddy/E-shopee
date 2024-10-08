import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../store/Context";

const Order = () => {
  let navigate = useNavigate();
  const location = useLocation();
  let { setCoupon, setAddCartProduct } = useProducts();

  const total = (location.state?.total * 100).toFixed(2) || 0;

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    console.log("Loading Razorpay SDK...");
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log("Razorpay SDK loaded:", res);
    console.log("Razorpay API Key:", process.env.REACT_APP_RAZORPAY_API_KEY);

    if (!res) {
      alert(
        "Failed to load Razorpay SDK. Please check your internet connection."
      );
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_API_KEY, // Ensure this is correct
      amount: total * 100,
      currency: "INR",
      name: "Test Payment",
      description: "Test Transaction",
      image: "https://example.com/your-logo.png",
      handler: function (response) {
        alert(
          `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );
        clearCartAndResetCoupon();
        navigate("/");
      },
      prefill: {
        name: "kmadhu",
        email: "kmadhu@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const clearCartAndResetCoupon = () => {
    setAddCartProduct([]);
    setCoupon(false);
    localStorage.removeItem("cart");
    localStorage.removeItem("coupon");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white rounded-md px-4 py-2 mb-4 hover:bg-blue-600 transition duration-200"
      >
        &lt; Back
      </button>
      <h1 className="text-2xl font-bold mb-8">Total: ₹{total}</h1>

      <button
        onClick={handlePayment}
        className="bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Order;
