import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PhishingIcon from "@mui/icons-material/Phishing";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useStateContext } from "../../context";
import LogoOfMarket from "./logo";

export default function UserPanel() {
  const [selectedTab, setSelectedTab] = useState("home"); // Default tab is 'home'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { countCart } = useStateContext();
  const count = countCart;

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 text-white z-50 bg-gradient-to-b from-black to-gray-700">
      <header className="h-24 w-full items-center flex text-center text-xl">
        <button
          className="block md:hidden p-2 absolute right-6 border rounded-lg"
          onClick={toggleMenu}
        >
          <MenuIcon fontSize="large" />
        </button>
        <LogoOfMarket />
        <nav className="hidden md:block w-4/6 text-center h-full">
          <ul className="flex w-2/3 m-auto justify-between h-full items-center">
            <li
              className={
                selectedTab === "home"
                  ? "text-yellow-500 font-bold"
                  : "hover:text-yellow-400"
              }
            >
              <Link to="/" onClick={() => handleTabClick("home")}>
                דף הבית
              </Link>
            </li>{" "}
            |
            <li
              className={
                selectedTab === "categories"
                  ? "text-yellow-500 font-bold"
                  : "hover:text-yellow-400"
              }
            >
              <Link
                to="/categories"
                onClick={() => handleTabClick("categories")}
              >
                מוצרים
              </Link>
            </li>{" "}
            |
            <li
              className={
                selectedTab === "spices"
                  ? "text-yellow-500 font-bold"
                  : "hover:text-yellow-400"
              }
            >
              <Link to="/spices" onClick={() => handleTabClick("spices")}>
                תבלינים
              </Link>
            </li>{" "}
            |
            <li
              className={
                selectedTab === "recipes"
                  ? "text-yellow-500 font-bold"
                  : "hover:text-yellow-400"
              }
            >
              <Link to="/recipes" onClick={() => handleTabClick("recipes")}>
                מתכונים
              </Link>
            </li>{" "}
            |
            <li
              className={
                selectedTab === "order"
                  ? "text-yellow-500 font-bold relative"
                  : "hover:text-yellow-400 relative"
              }
            >
              <Link to="/order" onClick={() => handleTabClick("order")}>
                <ShoppingCartOutlinedIcon fontSize="large" />
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center absolute -top-2 -right-2">
                  {count}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <article className="w-1/6 h-[inherit]">
          <p
            className={
              selectedTab === "login"
                ? "text-yellow-500 font-bold"
                : "hover:text-yellow-400"
            }
          >
            <Link
              to="/login"
              onClick={() => handleTabClick("login")}
              className="p-3 rounded-xl absolute left-2 md:left-14 top-5"
              aria-label="signup"
            >
              <PersonOutlineIcon fontSize="large" />
            </Link>
          </p>
        </article>
      </header>
      {isMenuOpen && (
        <div className="menu-container text-white absolute bg-gradient-to-t from-black to-gray-700 w-full p-3 text-xl">
          <ul className="m-2">
            <li
              style={{ marginBottom: "16px" }}
              className={
                selectedTab === "home"
                  ? "text-yellow-500 font-bold"
                  : "hover:text-yellow-400"
              }
            >
              <Link to="/" onClick={() => handleTabClick("home")}>
                {" "}
                <HomeOutlinedIcon />
                דף הבית{" "}
              </Link>
            </li>
            <li
              style={{ marginBottom: "16px" }}
              className={
                selectedTab === "categories"
                  ? "text-yellow-500 font-bold"
                  : "hover:text-yellow-400"
              }
            >
              <Link
                to="/categories"
                onClick={() => handleTabClick("categories")}
              >
                {" "}
                <PhishingIcon /> מוצרים{" "}
              </Link>
            </li>
            <li
              style={{ marginBottom: "16px" }}
              className={
                selectedTab === "spices"
                  ? "text-yellow-500 font-bold"
                  : "hover:text-yellow-400"
              }
            >
              <Link to="/spices" onClick={() => handleTabClick("spices")}>
                <WidgetsIcon /> תבלינים{" "}
              </Link>
            </li>
            <li
              style={{ marginBottom: "16px" }}
              className={
                selectedTab === "recipes"
                  ? "text-yellow-500 font-bold"
                  : "hover:text-yellow-400"
              }
            >
              <Link to="/recipes" onClick={() => handleTabClick("recipes")}>
                <ListAltIcon /> מתכונים{" "}
              </Link>
            </li>
            <li
              style={{ position: "relative" }}
              className={
                selectedTab === "order"
                  ? "text-yellow-500 font-bold"
                  : "hover:text-yellow-400"
              }
            >
              <Link to="/order" onClick={() => handleTabClick("order")}>
                <ShoppingCartOutlinedIcon fontSize="large" /> סל קניות
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center absolute -top-2 -right-2">
                  {count}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
