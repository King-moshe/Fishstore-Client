import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL, KEY_TOKEN, apiPost } from "../../services/apiService";
import { toast } from "react-toastify";

export default function SignIn() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const onSubForm = (_bodyData) => {
    doApiPost(_bodyData);
  };

  const doApiPost = async (_bodyData) => {
    const url = API_URL + "/users/login";
    try {
      const data = await apiPost(url, _bodyData);
      console.log(data);
      if (data.token && data.role === "admin") {
        localStorage.setItem(KEY_TOKEN, data.token);
        nav("/admin");
        toast.success(data.name + " התחברת בהצלחה");
      }
      if (data.token && data.role === "user") {
        localStorage.setItem(KEY_TOKEN, data.token);
        nav(localStorage.getItem("prevPageUrl") || "/");
        toast.success(data.name + " התחברת בהצלחה");
      } else {
        toast.error(data.name + " אינך מורשה גישה");
      }
    } catch (error) {
      console.log(error);
      toast.error("!שם משתמש או סיסמא אינם נכונים");
      setValue("email", "");
      setValue("password", "");
    }
  };

  const handleForgotPassword = async (data) => {
    try {
      const url = API_URL + "/users/forgotPassword";
      const response = await apiPost(url, { email: data.email });
      toast.success("נשלח אימייל עם קוד לאיפוס הסיסמה");
      setShowForgotPassword(false);
      setShowResetPassword(true);
    } catch (error) {
      console.log(error);
      toast.error("אירעה שגיאה בשליחת בקשת איפוס הסיסמה");
    }
  };

  const handleResetPassword = async (data) => {
    try {
      const url = API_URL + "/users/resetPassword";
      const response = await apiPost(url, {
        otp: data.otp,
        password: data.password,
      });
      toast.success("הסיסמה אופסה בהצלחה");
      setShowResetPassword(false);
      nav("/login");
    } catch (error) {
      console.log(error);
      toast.error("אירעה שגיאה באיפוס הסיסמה");
    }
  };

  return (
    <div className="md:pr-28 pt-24 md:w-1/2 w-full ">
      <div className="justify-center items-center text-white text-xl p-10 md:p-0 bg-opacity-30 bg-slate-300 md:border-l">
        {!showForgotPassword && !showResetPassword && (
          <form
            onSubmit={handleSubmit(onSubForm)}
            className=" shadow-2xl md:rounded-r-3xl"
          >
            <h2 className="font-bold text-3xl text-center text-white p-4">
              התחברות
            </h2>
            <div className="w-11/12 p-6 h-1/2">
              <label className="p-1">אימייל :</label>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                type="email"
                placeholder="הכנס אימייל..."
                className="w-full border border-black p-2 rounded-lg mt-3 text-black"
              />
              {errors.email && (
                <div className="text-red-800">כתובת אימייל שגויה</div>
              )}
            </div>
            <div className="w-11/12 p-6 pt-2 h-1/2">
              <label className="p-1">סיסמה :</label>
              <input
                {...register("password", { required: true, minLength: 4 })}
                type="password"
                placeholder="הכנס סיסמה..."
                className="w-full border border-black p-2 rounded-lg mt-3 text-black"
              />
              {errors.password && (
                <div className="text-red-800">סיסמה שגויה</div>
              )}
              <div className="flex items-center justify-between mt-4">
                <button className="border-white border rounded-lg p-2 hover:text-white hover:bg-green-700 text-white">
                  התחבר
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-200 hover:underline"
                >
                  שכחתי סיסמה
                </button>
              </div>
            </div>
          </form>
        )}

        {showForgotPassword && (
          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="backdrop-blur-lg shadow-2xl md:rounded-r-3xl"
          >
            <h2 className="font-bold text-3xl text-black p-4">שחזור סיסמה :</h2>
            <div className="w-full p-6 h-1/2">
              <label className="p-1">אימייל :</label>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                type="email"
                placeholder="הכנס אימייל..."
                className="w-full border border-black p-2 rounded-lg mt-3 text-black"
              />
              {errors.email && (
                <div className="text-red-800">כתובת אימייל שגויה</div>
              )}
              <div className="flex items-center justify-between mt-4">
                <button className="border-white border rounded-lg p-2 hover:text-white hover:bg-green-700 text-white">
                  שלח קוד לאיפוס סיסמה
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-blue-500 hover:underline"
                >
                  חזרה להתחברות
                </button>
              </div>
            </div>
          </form>
        )}

        {showResetPassword && (
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="backdrop-blur-lg shadow-2xl md:rounded-r-3xl"
          >
            <h2 className="font-bold text-3xl text-black p-4">איפוס סיסמה :</h2>
            <div className="w-full p-6 h-1/2">
              <label className="p-1">קוד איפוס :</label>
              <input
                {...register("otp", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                })}
                type="text"
                placeholder="הכנס את הקוד שקיבלת באימייל..."
                className="w-full border border-black p-2 rounded-lg mt-3 text-black"
              />
              {errors.otp && (
                <div className="text-red-800">נא להזין קוד בן 6 ספרות</div>
              )}
              <label className="p-1 mt-4 block">סיסמה חדשה :</label>
              <input
                {...register("password", { required: true, minLength: 4 })}
                type="password"
                placeholder="הכנס סיסמה חדשה..."
                className="w-full border border-black p-2 rounded-lg mt-3 text-black"
              />
              {errors.password && (
                <div className="text-red-800">
                  סיסמה חייבת להכיל לפחות 4 תווים
                </div>
              )}
              <div className="flex items-center justify-center mt-4">
                <button className="border-white border rounded-lg p-2 hover:text-white hover:bg-green-700 text-white">
                  אפס סיסמה
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
