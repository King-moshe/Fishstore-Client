import React, { useEffect, useState } from "react";
import AuthAdmin from "./authAdmin";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { API_URL, apiGet } from "../../services/apiService";
import Counts from "./counts";

const getRandomColors = (numColors) => {
  const colors = [];
  while (colors.length < numColors) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    if (randomColor !== '#000000') {
      colors.push(randomColor);
    }
  }
  return colors;
};

export default function AdminControll() {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);

  const doApi = async () => {
    const url = API_URL + "/categories/list";
    try {
      const response = await apiGet(url);
      const formattedData = response.map((item) => ({
        name: item.name,
        value: item.count,
      }));
      console.log("Fetched Data:", formattedData);
      setData(formattedData);
      setColors(getRandomColors(formattedData.length));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    doApi();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700 text-white p-6">
      <AuthAdmin />
      <div className="container mx-auto py-8 md:flex justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div className="md:w-[48%] bg-gray-800 bg-opacity-70 rounded-lg p-4 transition-transform duration-200 hover:scale-105 shadow-zinc-300 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Category Counts</h2>
          <Counts />
        </div>
        <div className="md:w-[48%] mt-6 sm:mt-0 bg-gray-800 bg-opacity-70 rounded-lg p-4 transition-transform duration-200 hover:scale-105 shadow-zinc-300 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
          <Counts />
        </div>
        <div className="md:w-[48%] mt-6 md:mt-0 bg-gray-800 bg-opacity-70 rounded-lg p-4 transition-transform duration-200 hover:scale-105 shadow-zinc-300 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Product Overview</h2>
          <Counts />
        </div>
        <div className="md:w-[48%] mt-6 md:mt-0 bg-gray-800 bg-opacity-70 rounded-lg p-4 transition-transform duration-200 hover:scale-105 shadow-zinc-300 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Product Overview</h2>
          <Counts />
        </div>
      </div>
    </div>
  );
}
