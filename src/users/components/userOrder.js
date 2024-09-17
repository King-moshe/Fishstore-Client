import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link } from "react-router-dom";

export default function UserOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { setCountCart } = useStateContext();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const calculatedTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalAmount(calculatedTotal);
    setCountCart(cartItems.length);
  }, [cartItems]);

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const updateQuantity = (index, newQuantity) => {
    newQuantity = Math.max(0, newQuantity);
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700">
      <div className="min-h-min border-2 border-gray-400 p-5 md:w-2/3 rounded-lg m-5 bg-gray-800 bg-opacity-90 shadow-xl">
        {cartItems.length === 0 ? (
          <div className="text-center text-white">
            <p className="pb-5 text-xl font-semibold">
              סל הקניות שלך ריק, בחר מוצרים מהחנות <AddShoppingCartIcon />{" "}
              <SentimentSatisfiedAltIcon />
            </p>
            <Link
              to="/products"
              className="border border-gray-300 text-white bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg transition duration-300 hover:bg-yellow-700"
            >
              המשך קנייה
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-center text-3xl font-bold text-yellow-400 mb-5">
              סל הקניות שלך <ShoppingCartCheckoutIcon />
            </h1>
            <ul>
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="p-4 mb-3 flex justify-between items-center border-b border-gray-500 text-white"
                >
                  <p className="md:w-1/4 w-1/2 font-bold">{item.name}</p>
                  <p className="md:w-1/4 w-1/2 pl-4 pr-2">
                    כמות:
                    <input
                      className="w-16 text-black font-semibold rounded-md ml-2"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(index, e.target.value)}
                    />
                  </p>
                  <p className="md:w-1/4 w-1/2 pl-1">
                    {item.price.toFixed(2)} ש"ח
                  </p>
                  <button
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                    onClick={() => removeItem(index)}
                  >
                    הסר מוצר
                  </button>
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-bold text-yellow-300 text-center mt-6">
              סה"כ לתשלום: {totalAmount.toFixed(2)} ש"ח
            </h2>
            <div className="flex justify-center mt-8">
              <Link
                to="/checkout"
                className="border-2 border-yellow-500 text-yellow-500 p-3 rounded-lg ml-4 transition duration-300 hover:bg-yellow-500 hover:text-black"
              >
                מעבר לתשלום
              </Link>
              <Link
                to="/products"
                className="border-2 border-gray-300 p-3 rounded-lg ml-4 text-white hover:bg-gray-700 transition duration-300 flex items-center"
              >
                המשך קנייה
                <SentimentSatisfiedAltIcon className="ml-2" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
