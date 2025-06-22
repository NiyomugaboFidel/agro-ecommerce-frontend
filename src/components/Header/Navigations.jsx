import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import i18n from "../common/components/LangConfig";
import getUserInfo from "../../lib/userInfo";

const Navigations = ({ toggleDrawer }) => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getUserInfo();
    setCurrentUser(user?.data);
  }, []);

  const routes = [
    { path: "/", label: i18n.t("home") },
    { path: "/allProducts", label: i18n.t("allProducts.redTitle") },
    { path: "/contact", label: i18n.t("contact") },
    { path: "/about", label: i18n.t("about") },
  ];

  if (currentUser?.role === "manager") {
    routes.push({ path: "/dashboard/products", label: i18n.t("Dashboard") });
  } else if (currentUser?.role === "superAdmin") {
    routes.push({ path: "/dashboard", label: i18n.t("Dashboard") });
  } else if (currentUser?.role === "client") {
    routes.push({ path: "/request", label: i18n.t("manager") });
  }

  if (!currentUser) {
    routes.push(
      { path: "/login", label: i18n.t("loginPage.login") },
      { path: "/signup", label: i18n.t("signUp") }
    );
  }

  return (
    <nav className="flex flex-col lg:flex-row items-start bg-white h-full dark:bg-darkTheme lg:items-center text-sm">
      {routes.map((route, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-md cursor-pointer ${
            location.pathname === route.path
              ? "font-semibold text-red-500 dark:text-yellow-400"
              : "hover:font-semibold text-gray-700 dark:text-gray-300"
          }`}
        >
          <Link
            to={route.path}
            onClick={toggleDrawer ? toggleDrawer(false) : undefined}
          >
            {route.label}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};

export default Navigations;
