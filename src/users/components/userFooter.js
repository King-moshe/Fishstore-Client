import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import { Link } from "react-router-dom";

export default function UserFooter() {
  return (
    <div className="mh-44 bg-gradient-to-t from-black to-gray-700 justify-center text-white">
      <div className="md:flex w-full">
        <div className="md:w-1/3 text-center p-3">
          <p className="font-bold">
            {" "}
            <AccessTimeIcon />
          </p>
          <strong>
            <p>ימים ב' - ה': 19:00 - 10:00</p>
            <p>יום ו' וערבי חג : 15:00 - 9:00</p>
          </strong>
        </div>
        <div className="md:w-1/3 text-center p-3">
          <p className="font-bold ">
            <LocationOnOutlinedIcon />
          </p>
          <strong>
            <p>Tel Aviv, Iben Gevirol </p>
            <p>052-8857298</p>
          </strong>
        </div>
        <div className="md:w-1/3 text-center p-3">
          <p className="font-bold">
            <DeliveryDiningOutlinedIcon />
          </p>
          <strong>
            {" "}
            <p>
              Tel Aviv, Modi'n
              <br />
              Center district{" "}
            </p>
          </strong>
        </div>
      </div>
      <div className="text-center mt-5">
        <div className=" mb-2.5">
          <h2>Follow us</h2>
          <Link
            to="https://www.instagram.com/moshe_amar9/?next=%2F"
            target="_blank"
          >
            <InstagramIcon className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md mt-4" />
          </Link>
          <Link to="https://www.linkedin.com/in/moshe-amar/" target="_blank">
            <LinkedInIcon className="mt-4 bg-blue-800 text-white rounded-md ms-5" />
          </Link>
          <Link to="" target="_blank">
            <FacebookIcon className="mt-4 bg-white text-blue-800 rounded-md ms-5" />
          </Link>
          <a
            href="mailto:moso2411@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AlternateEmailIcon className="mt-4 bg-white text-rose-700 rounded-md ms-5" />
          </a>
        </div>
        <div className="pb-3">
          <CopyrightIcon /> All rights reserved to <strong>Moshe Amar</strong>
        </div>
      </div>
    </div>
  );
}
