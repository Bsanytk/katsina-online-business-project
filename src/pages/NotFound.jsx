// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700">
        {t("pageNotFound") || "Oops! Page not found."}
      </p>
      <Link
        to="/"
        className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
      >
        {t("goHome") || "Go Back Home"}
      </Link>
    </div>
  );
};

export default NotFound;