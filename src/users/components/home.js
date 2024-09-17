import React from "react";
import "../design/home.css";
import hpageImage from "../../pictures/salmonBG.jpg";
import bgImage from "../../pictures/bgOfSalmon.jpg";
import SetMealIcon from "@mui/icons-material/SetMeal";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();


  return (
    <div className="min-h-screen">
      <main className="static min-h-screen justify-center flex">
        <img
          src={hpageImage}
          alt="Information"
          className="w-full md:flex hidden"
        />
        <div className="absolute top-72 text-center text-white w-2/3 md:w-1/2 min-h-[140px] bg-slate-50 bg-opacity-40 md:bg-opacity-30 rounded-lg">
          <h2 className="font-serif font-extrabold  text-3xl pt-7 mb-4">
            Ocean Fish
          </h2>
          <button onClick={()=>nav('/products')} className="bg-gradient-to-b from-gray-800 to-gray-700 p-1.5 rounded-md ml-2">
            המוצרים שלנו
          </button>
          <button onClick={()=>nav('/login')} className="bg-gradient-to-b from-gray-800 to-gray-700 p-1.5 rounded-md">
             הרשמה מהירה
          </button>
        </div>
        <div className="absolute bottom-0 w-full min-h-[100px] bg-slate-900 opacity-70 flex items-center justify-center text-white">
          <div className="m-3 hidden md:block text-center">
            <AccessTimeIcon
              sx={{ width: "100%", fontSize: 50, color: "whitesmoke" }}
            />
            <p className="">זמינות גבוהה</p>
          </div>
          <div className="m-3 mr-14 hidden md:block text-center">
            <DeliveryDiningIcon sx={{ width: "100%", fontSize: 50 }} />
            <p className="">שירות משלוחים</p>
          </div>
          <div className="m-3 md:mr-14 text-center">
            <AssignmentTurnedInIcon sx={{ width: "100%", fontSize: 50 }} />
            <p className=""> בד"צ בית יוסף</p>
          </div>
          <div className="m-3 md:mr-14 text-center">
            <WorkspacePremiumIcon sx={{ width: "100%", fontSize: 50 }} />
            <p className="">איכות ללא פשרות</p>
          </div>
          <div className="m-3 md:mr-14 text-center">
            <SetMealIcon sx={{ width: "100%", fontSize: 50 }} />
            <p className="">מבחר גדול</p>
          </div>
        </div>
        <img
          src={bgImage}
          alt="Back ground"
          className="flex md:hidden min-h-screen"
        />
      </main>
    </div>
  );
}
