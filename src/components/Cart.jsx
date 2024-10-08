import React, { useEffect, useState } from "react";
import { useProducts } from "../store/Context";
import ProductItem from "./ProductItem";
import toast from "react-hot-toast";
import Order from "./Order";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const {
    addCartProduct,
    quantities,
    prices,
    handleQuantityChange,
    coupon,
    setCoupon,
  } = useProducts();

  const [couponCode, setCouponCode] = useState("");
  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  let navigate = useNavigate();
  const [isCouponApplied, setIsCouponApplied] = useState(false); // State to track coupon application

  let [message, setMessage] = useState("");

  // Calculate subtotal
  const getSubtotal = () => {
    return addCartProduct.reduce((acc, product) => {
      const quantity = quantities[product.id] || 1; // Default to 1 if not set
      return acc + quantity * product.price;
    }, 0);
  };

  useEffect(() => {
    const currentTotal = getSubtotal();

    if (currentTotal === 0) {
      setIsCouponApplied(false); // Reset coupon if cart is empty
      setTotal(10); // Set total to delivery charge if no items are in the cart
    } else if (currentTotal > 50) {
      setTotal(currentTotal); // No delivery fee if total is greater than $50
    } else {
      setTotal(currentTotal + 10); // Add delivery fee for totals <= 50
    }
  }, [addCartProduct, handleQuantityChange]);

  // Coupon function
  const applyCoupon = () => {
    if (!isCouponApplied) {
      if (couponCode.toUpperCase() === coupon.trim()) {
        const discount = (total * 20) / 100; // 20% discount on total
        const newTotal = total - discount;

        setTotal(newTotal); // Set the new total after applying the discount
        setCouponCode(""); // Clear the coupon input field
        setIsCouponApplied(true); // Mark coupon as applied
        toast.success("COUPON APPLIED");
      } else {
        toast.error("Invalid coupon code");
      }
    } else {
      toast.error("Coupon already applied");
    }
  };

  // Order confirmation
  const confirmOrder = () => {
    if (total > 10) {
      navigate("/order", { state: { total } });
    } else {
      setMessage("add Products to Cart");
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row gap-4 m-5 overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }} // Ensure parent container doesn't scroll
    >
      {/* Cart Items Section */}
      <div className="flex flex-col lg:w-7/10 md:w-7/10 sm:w-full h-[90%] overflow-y-auto p-4 bg-gray-100 rounded-md shadow-lg">
        {addCartProduct.length === 0 ? (
          <div className="text-center text-lg font-semibold">
            Nothing in Cart
          </div>
        ) : (
          addCartProduct.map((product) => {
            const quantity = quantities[product.id] || 1;
            const price = prices[product.id] || product.price;

            return (
              <ProductItem
                key={product.id}
                item={product}
                quantity={quantity}
                price={price}
                onQuantityChange={handleQuantityChange}
              />
            );
          })
        )}
      </div>

      {/* Order Summary Section */}
      <div className="flex flex-col lg:w-3/10 md:w-3/10 sm:w-full bg-gray-100 p-6 rounded-md shadow-lg h-[90%] ">
        <h3 className="text-lg font-semibold mb-5">Order Summary</h3>
        {/* Delivery Fee Logic */}
        <div className="flex justify-between mb-2">
          <span>Delivery Fee (below $50)</span>
          <span>
            {getSubtotal() > 50 ? (
              <div>No delivery fee</div>
            ) : (
              <div>$10.00</div> // Assuming $10 is the delivery fee when subtotal is <= 50
            )}
          </span>
        </div>
        {/* Total */}
        <div className="flex justify-between font-bold text-lg mb-5">
          <span>Total</span>
          <span>
            ${total.toFixed(2)} {isCouponApplied && <p>Coupon applied</p>}
          </span>
        </div>
        {/* Coupon Code Section */}
        <div className="flex flex-col mt-5">
          <label htmlFor="coupon" className="text-sm mb-2">
            Have a coupon code?
          </label>
          <input
            type="text"
            id="coupon"
            placeholder="Enter coupon code"
            className="p-2 border border-gray-300 rounded-md mb-3"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-md mb-5"
            onClick={applyCoupon}
          >
            Apply Coupon
          </button>
        </div>

        <button
          className="bg-green-600 text-white p-3 rounded-md mt-5 font-semibold"
          onClick={confirmOrder}
        >
          Confirm Order
        </button>
        {message && (
          <p className="text-bold          text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
