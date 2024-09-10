import React from "react";
import AuthAdmin from "./authAdmin";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'הזמנות', value: 700 },
  { name: 'דגים', value: 300 },
  { name: 'תבלינים', value: 1000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function AdminControll() {
 
  

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700 text-white">
      <AuthAdmin />     
      <div className="border h-1/2">Top</div>
      <div className="border h-1/2 flex">
        <div className="w-1/2 border">Right</div>
        <div className="w-1/2 border min-h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}