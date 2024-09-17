import React, { useEffect, useState } from "react";
import { API_URL, apiGet } from "../../services/apiService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../../context";
import EastIcon from "@mui/icons-material/East";

export default function ProductsList() {
  const [catListAr, setCatListAr] = useState([]);
  const [counts, setCounts] = useState([]);
  const [products, setProducts] = useState([]);
  const { setCountCart } = useStateContext();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    doApi();
    doApiGetCatList();
  }, []);

  const doApi = async () => {
    const url = API_URL + "/products/list";
    try {
      const products = await apiGet(url);
      console.log(products);
      setProducts(products);
      setCounts(new Array(products.length).fill(1));
    } catch (error) {
      console.log(error);
    }
  };

  const doApiGetCatList = async () => {
    const url = API_URL + "/categories/list";
    try {
      const data = await apiGet(url);
      console.log(data);
      setCatListAr(data);
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

  function incrementCount(index) {
    const newCounts = [...counts];
    newCounts[index] = counts[index] + 1;
    setCounts(newCounts);
  }

  function decrementCount(index) {
    if (counts[index] > 1) {
      const newCounts = [...counts];
      newCounts[index] = counts[index] - 1;
      setCounts(newCounts);
    }
  }

  const filteredAndSortedData = products
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item) =>
      selectedCategory ? item.cat_url === selectedCategory : true
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-8">
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:items-center">
            <input
              type="search"
              className="p-2 border border-gray-400 rounded-lg w-full md:w-auto md:ml-2"
              placeholder="חיפוש ..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select
              className="p-2 border border-gray-400 rounded-lg w-full md:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">כל הקטגוריות</option>
              {catListAr.map((cat) => (
                <option key={cat._id} value={cat.cat_url}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              className="p-2 border border-gray-400 rounded-lg w-full md:w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">מחיר: מהנמוך לגבוה</option>
              <option value="desc">מחיר: מהגבוה לנמוך</option>
            </select>
          </div>
          <Link to="/categories" className="text-white text-xl">
            <EastIcon />
          </Link>
        </div>
        <h1 className="text-3xl text-white text-center mb-8">המוצרים שלנו</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedData.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="font-bold text-lg text-white">
                לא נמצאו מוצרים התואמים את החיפוש
              </p>
            </div>
          ) : (
            filteredAndSortedData.map((item, index) => (
              <div
                key={item._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-center mb-2">
                    {item.name}
                  </h2>
                  <p className="text-center">{item.price} ש"ח לק"ג</p>
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