import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { API_URL, apiGet } from "../../services/apiService";

const getRandomColors = (numColors) => {
  const colors = [];
  while (colors.length < numColors) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    // Ensure the color is not black
    if (randomColor !== '#000000') {
      colors.push(randomColor);
    }
  }
  return colors;
};


// Custom label function
const renderLabel = (entry) => `${entry.value}`;

export default function Counts() {
  const [data, setData] = useState([]);
  const [colors, setColors] = useState([]);

  const doApiCategory = async () => {
    const url1 = API_URL + "/categories/count";
    const url2 = API_URL + "/users/count";
    const url3 = API_URL + "/products/count";
    
    try {
      const [categoriesCount, usersCount, productsCount] = await Promise.all([
        apiGet(url1),
        apiGet(url2),
        apiGet(url3),
      ]);
      const formattedData = [
        { name: 'Categories', value: categoriesCount.count },
        { name: 'Users', value: usersCount.count },
        { name: 'Products', value: productsCount.count },
      ];
      setData(formattedData);
      setColors(getRandomColors(formattedData.length));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    doApiCategory();
  }, []);

  return (
    <div className="p-3">
      <h2 className="text-center text-lg">מידע כללי</h2>
      {data.length > 0 ? (
        
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie 
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={renderLabel} // Set the custom label function here
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Legend/>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center">אין נתונים להצגה</div>
      )}
    </div>
  );
}
