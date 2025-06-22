"use client";
import { Link } from "react-router-dom";
import NavLinks from "../common/components/ui/NavLinks";
// import logo from '@/assets/images/logo.png';
// import { signOut } from 'next-auth/react';
import { IoIosLogOut } from "react-icons/io";
import i18n from "../common/components/LangConfig";

const SideNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="flex  flex-col py-4 md:px-2 h-screen md:w-44 fixed xs:bg-slate-200 xs:h-fit">
      <Link
        className="mb-2 flex items-center justify-center rounded-md h-[80px]"
        to="/"
      >
        <div className="w-full dark:flex items-center justify-center text-white md:w-40">
          <img
            className="h-[70px] w-full object-contain dark:hidden block"
            src="/images/logo.jpg"
            width={70}
            height={70}
            alt="PropertyPulse"
          />
          <img
            className="h-[70px] dark:block object-contain hidden w-[70px] md:w-[60px]"
            src="/images/logo.jpg"
            width={70}
            height={70}
            alt="PropertyPulse"
          />
        </div>
      </Link>
      <div className="flex h-full grow flex-row lg:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <button
          onClick={handleLogout}
          className="dark:text-gray-300 flex h-[48px] xs:bg-amber-50 w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-slate-100 hover:text-gray-700 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <IoIosLogOut />
          <div className="md:block">{i18n.t("headerIcons.5")}</div>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
