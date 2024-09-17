import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoOfMarket() {
  const nav = useNavigate();

  const handleClick = () => {
    nav("/");
  };
  return (
    <>
      <svg
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        width="16.6%"
        height="6rem"
        viewBox="0 0 300 200"
        preserveAspectRatio="xMidYMid meet"
        className="hidden md:block hover:cursor-pointer"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#000000", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#374151", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        <circle cx="150" cy="100" r="90" fill="url(#bgGradient)" />

        <path
          d="M100,100 Q125,70 150,100 T200,100 L180,80 M200,100 L180,120"
          stroke="#ffd700"
          strokeWidth="4"
          fill="none"
        />

        <circle cx="120" cy="95" r="5" fill="#ffd700" />

        <path
          d="M130,105 Q140,110 150,105 M140,115 Q150,120 160,115 M150,125 Q160,130 170,125"
          stroke="#ffd700"
          strokeWidth="2"
          fill="none"
        />

        <text
          x="150"
          y="160"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fill="#ffd700"
          textAnchor="middle"
        >
          LUXE FISH
        </text>
        <text
          x="150"
          y="180"
          fontFamily="Arial, sans-serif"
          fontSize="12"
          fill="#ffd700"
          textAnchor="middle"
        >
          MARKET
        </text>
      </svg>
    </>
  );
}
