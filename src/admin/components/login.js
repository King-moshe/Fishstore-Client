import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL, KEY_TOKEN, apiPost } from "../../services/apiService";
import { toast } from "react-toastify";

// SVG icons as React components
const FishIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
    <path d="M18 12v.5" />
    <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
    <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
    <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
    <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SignIn = ({ onSwitchToSignUp }) => {
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
      await apiPost(url, { email: data.email });  // Removed 'response' assignment
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
      await apiPost(url, {
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
    <div className="w-full max-w-md mx-auto">
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
        התחברות לחנות הדגים
      </h2>
      {!showForgotPassword && !showResetPassword && (
        <form onSubmit={handleSubmit(onSubForm)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                אימייל
              </label>
              <div className="relative">
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  })}
                  id="email"
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="אימייל"
                />
                <MailIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                סיסמה
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: true, minLength: 4 })}
                  id="password"
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="סיסמה"
                />
                <LockIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {errors.email && (
            <p className="text-red-500 text-xs italic">כתובת אימייל שגויה</p>
          )}
          {errors.password && (
            <p className="text-red-500 text-xs italic">סיסמה שגויה</p>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowLeftIcon
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  aria-hidden="true"
                />
              </span>
              התחבר
            </button>
          </div>

          <div className="text-sm text-center">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              שכחתי סיסמה
            </button>
          </div>
        </form>
      )}

      {showForgotPassword && (
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="mt-8 space-y-6"
        >
          <div>
            <label htmlFor="reset-email" className="sr-only">
              אימייל
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
              id="reset-email"
              type="email"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="הכנס את כתובת האימייל שלך"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs italic">כתובת אימייל שגויה</p>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              שלח קוד לאיפוס סיסמה
            </button>
          </div>
          <div className="text-sm text-center">
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              חזרה להתחברות
            </button>
          </div>
        </form>
      )}

      {showResetPassword && (
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="mt-8 space-y-6"
        >
          <div>
            <label htmlFor="otp" className="sr-only">
              קוד איפוס
            </label>
            <input
              {...register("otp", {
                required: true,
                minLength: 6,
                maxLength: 6,
              })}
              id="otp"
              type="text"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="הכנס את הקוד שקיבלת באימייל"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="sr-only">
              סיסמה חדשה
            </label>
            <input
              {...register("password", { required: true, minLength: 4 })}
              id="new-password"
              type="password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="הכנס סיסמה חדשה"
            />
          </div>
          {errors.otp && (
            <p className="text-red-500 text-xs italic">
              נא להזין קוד בן 6 ספרות
            </p>
          )}
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              סיסמה חייבת להכיל לפחות 4 תווים
            </p>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              אפס סיסמה
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const SignUp = ({ onSwitchToSignIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const nav = useNavigate();

  const onSubForm = async (data) => {
    try {
      const url = API_URL + "/users";
      const response = await apiPost(url, data);
      console.log(response);
      toast.success("נרשמת בהצלחה!");
      localStorage.setItem(KEY_TOKEN, response.token);
      nav("/products");
    } catch (error) {
      console.log(error);
      toast.error("אירעה שגיאה בהרשמה");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
        הרשמה לחנות הדגים
      </h2>
      <form onSubmit={handleSubmit(onSubForm)} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="fullName" className="sr-only">
              שם מלא
            </label>
            <div className="relative">
              <input
                {...register("name", { required: true })}
                id="name"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="שם מלא"
              />
              <UserIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              טלפון
            </label>
            <div className="relative">
              <input
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                })}
                id="phone"
                type="tel"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="טלפון"
              />
              <PhoneIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              אימייל
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                id="email"
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="אימייל"
              />
              <MailIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              סיסמה
            </label>
            <div className="relative">
              <input
                {...register("password", { required: true, minLength: 6 })}
                id="password"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="סיסמה"
              />
              <LockIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              אימות סיסמה
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (val) =>
                    val === watch("password") || "הסיסמאות אינן תואמות",
                })}
                id="confirmPassword"
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="אימות סיסמה"
              />
              <LockIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {errors.name && (
          <p className="text-red-500 text-xs italic">נא להזין שם מלא</p>
        )}
        {errors.phone && (
          <p className="text-red-500 text-xs italic">
            נא להזין מספר טלפון תקין
          </p>
        )}
        {errors.email && (
          <p className="text-red-500 text-xs italic">
            נא להזין כתובת אימייל תקינה
          </p>
        )}
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            סיסמה חייבת להכיל לפחות 6 תווים
          </p>
        )}
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">
            {errors.confirmPassword.message}
          </p>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <ArrowLeftIcon
                className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                aria-hidden="true"
              />
            </span>
            הירשם
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700 flex flex-col md:flex-row items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <FishIcon className="mx-auto h-12 w-auto text-blue-600" />
          </div>
          {isSignUp ? (
            <SignUp onSwitchToSignIn={() => setIsSignUp(false)} />
          ) : (
            <SignIn onSwitchToSignUp={() => setIsSignUp(true)} />
          )}
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isSignUp ? "כבר יש לך חשבון? התחבר" : "אין לך חשבון? הירשם"}
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-blue-600 p-8 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              ברוכים הבאים לחנות הדגים שלנו!
            </h3>
            <p className="mb-4">גלו מגוון רחב של דגים טריים ואיכותיים.</p>
            <p>הצטרפו אלינו לחוויית קנייה ייחודית ומהנה.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
