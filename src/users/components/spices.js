import React, { useEffect, useState } from "react";
import { API_URL, apiGet } from "../../services/apiService";
import { toast } from "react-toastify";
import { useStateContext } from "../../context";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

export default function Spices() {
  const [counts, setCounts] = useState([]); // Use an array to store counts for each product
  const [data, setData] = useState([]);
  const { setCountCart } = useStateContext();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    const url = API_URL + "/products/list";
    try {
      const data = await apiGet(url);
      console.log(data);
      const filteredData = data.filter((item) => item.cat_url === "תבלינים");
      setData(filteredData);
      // Initialize counts array with default values
      setCounts(new Array(filteredData.length).fill(1));
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product, index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToAdd = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: counts[index], // Use the count for the specific product
    };
    cart.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.info("המוצר התווסף לסל הקניות!");

    // Reset the count to 1 after adding the product
    const newCounts = [...counts];
    newCounts[index] = 1;
    setCounts(newCounts);
    setCountCart(cart.length);
  };

  function incrementCount(index) {
    // Create a new counts array and update the count for the specific product
    const newCounts = [...counts];
    newCounts[index] = counts[index] + 1;
    setCounts(newCounts);
  }

  function decrementCount(index) {
    // Create a new counts array and update the count for the specific product
    if (counts[index] > 1) {
      const newCounts = [...counts];
      newCounts[index] = counts[index] - 1;
      setCounts(newCounts);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700 ">
      <div className="flex p-4 text-white">
        <div className="w-1/5 text-center">
          <Link to="/categories" className="rounded-lg">
            <EastIcon />
          </Link>
        </div>
        <div className="w-3/5 text-center">
          <h1 className="text-3xl">תבלינים</h1>
        </div>
        <div className="w-1/5 text-center">
          {/* Empty div to maintain the layout */}
        </div>
      </div>
      <article className="flex flex-wrap justify-center mt-3">
        {data.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          data.map((item, index) => (
            <div
              key={item._id}
              className="md:w-1/5 rounded-xl w-[75%] m-3.5 bg-white drop-shadow-2xl"
            >
              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-t-xl"
                />
                <div className="p-3 text-center">
                  <h2>
                    <b>{item.name}</b>
                  </h2>
                  <h2>{item.price} ש"ח לק"ג</h2>
                </div>
              </div>
              <div className="text-center p-1 mb-2 flex justify-center">
                <button
                  className="me-3 border border-black p-2 rounded-md bg-blue-500 hover:ring-2 ring-black text-white"
                  onClick={() => addToCart(item, index)}
                  aria-label={`Add ${item.name} to cart`}
                >
                  הוסף לסל
                </button>
                <div className="border rounded-lg">
                  <button
                    className="p-2.5 border font-bold hover-bg-black hover-text-white rounded-r-lg"
                    onClick={() => incrementCount(index)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                  <span className="p-2">
                    <strong>{counts[index]} יח'</strong>
                  </span>
                  <button
                    className="p-2.5 border font-bold hover-bg-black hover-text-white rounded-l-lg"
                    onClick={() => decrementCount(index)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </article>
    </div>
  );
}
