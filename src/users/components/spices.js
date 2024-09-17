import React, { useEffect, useState } from "react";
import { API_URL, apiGet } from "../../services/apiService";
import { toast } from "react-toastify";
import { useStateContext } from "../../context";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

export default function Spices() {
  const [counts, setCounts] = useState([]);
  const [data, setData] = useState([]);
  const { setCountCart } = useStateContext();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    const url = API_URL + "/products/list";
    try {
      const data = await apiGet(url);
      const filteredData = data.filter((item) => item.cat_url === "תבלינים");
      setData(filteredData);
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
      quantity: counts[index],
    };
    cart.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.info("המוצר התווסף לסל הקניות!");

    const newCounts = [...counts];
    newCounts[index] = 1;
    setCounts(newCounts);
    setCountCart(cart.length);
  };

  const incrementCount = (index) => {
    const newCounts = [...counts];
    newCounts[index] = counts[index] + 1;
    setCounts(newCounts);
  };

  const decrementCount = (index) => {
    if (counts[index] > 1) {
      const newCounts = [...counts];
      newCounts[index] = counts[index] - 1;
      setCounts(newCounts);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-8">
          <Link to="/categories" className="text-white text-xl">
            <EastIcon />
          </Link>
          <h1 className="text-3xl text-white text-center">תבלינים</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="font-bold text-lg text-white">טוען...</p>
            </div>
          ) : (
            data.map((item, index) => (
              <div
                key={item._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                  <p>{item.price} ש"ח לק"ג</p>
                  <div className="flex justify-center items-center space-x-2 mt-4">
                    <button
                      className="ml-1.5 px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => addToCart(item, index)}
                    >
                      הוסף לסל
                    </button>
                    <div className="flex items-center border rounded-lg">
                      <button
                        className="px-3 py-1 font-bold hover:bg-gray-200 rounded-l-lg"
                        onClick={() => decrementCount(index)}
                      >
                        -
                      </button>
                      <span className="px-3 py-1">
                        <strong>{counts[index]} יח'</strong>
                      </span>
                      <button
                        className="px-3 py-1 font-bold hover:bg-gray-200 rounded-r-lg"
                        onClick={() => incrementCount(index)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
