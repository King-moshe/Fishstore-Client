import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, apiGet } from "../../services/apiService";
import EastIcon from "@mui/icons-material/East";

export default function CategoriesList() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    const url = API_URL + "/categories/list";
    try {
      const data = await apiGet(url);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (category) => {
    switch (category.cat_url) {
      case "קפואים":
        nav("/frozenFish", { state: category });
        break;
      case "טריים":
        nav("/freshFish", { state: category });
        break;
      case "תבלינים":
        nav("/spices", { state: category });
        break;
      case "יינות":
        nav("/wines", { state: category });
        break;
      default:
        console.log("Unknown category:", category.cat_url);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-8">
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:items-center">
            <input
              type="search"
              className="p-2 border border-gray-400 rounded-lg w-full md:w-auto md:ml-2"
              placeholder="חיפוש קטגוריה..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Link to="/" className="text-white text-xl">
            <EastIcon />
          </Link>
        </div>
        <h1 className="text-3xl text-white text-center mb-8">קטגוריית מוצרים</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredData.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="font-bold text-lg text-white">
                לא נמצאו קטגוריות התואמות את החיפוש
              </p>
            </div>
          ) : (
            filteredData.map((item) => (
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
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => handleButtonClick(item)}
                    >
                      מעבר לעמוד
                    </button>
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