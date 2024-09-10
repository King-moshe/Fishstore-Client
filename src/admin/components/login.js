import React from "react";
import imageBG from "../design/adminD.css";
import SignUp from "./signUp";
import SignIn from "./signIn";

export default function Login() {

  return (
    <div className="min-h-screen w-full imageBG flex">    
      <SignIn/>
      <SignUp/>
    </div>
  );
}