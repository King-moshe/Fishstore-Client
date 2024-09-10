import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, apiGet } from "../../services/apiService";
import EastIcon from "@mui/icons-material/East";

export default function CategoriesList() {
  const [data, setData] = useState([]);
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
    if (category.cat_url === "קפואים") {
      nav("/frozenFish", { state: category });
    }
    if (category.cat_url === "טריים") {
      nav("/freshFish", { state: category });
    }
    if (category.cat_url === "תבלינים") {
      nav("/spices", { state: category });
    }
    if (category.cat_url === "יינות") {
      nav("/wines", { state: category });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700">
      <div className="flex p-4 text-white">
        <div className="w-1/5 text-center">
          <Link to="/" className="rounded-lg">
            <EastIcon />
          </Link>
        </div>
        <div className="w-3/5 text-center">
          <h1 className="text-3xl">קטגוריית מוצרים</h1>
        </div>
        <div className="w-1/5 text-center">
          {/* Empty div to maintain the layout */}
        </div>
      </div>
      <article className="flex justify-center mt-3 flex-wrap">
        {data.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          data.map((item, index) => (
            <div
              key={item._id}
              className="min-h-[320px] md:w-1/5 rounded-xl w-[75%] m-3.5 bg-white drop-shadow-2xl"
            >
              <div className="h-full">
                <img
                  src={item.image}
                  alt="avatar"
                  className="rounded-t-xl h-[70%] w-full"
                />
                <div className="p-3 text-center">
                  <h2>
                    <b>{item.name}</b>
                  </h2>
                  <button
                    className="border p-2 mt-2 rounded-lg bg-blue-600 text-white"
                    onClick={() => handleButtonClick(item)}
                  >
                    מעבר לעמוד
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
