import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import customAxios from "../../../../lib/customAxios";

const GoogleWelcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const googleQuery = location.search;
  let loading = true;
  const loginWithGoogle = async () => {
    try {
      const response = await customAxios.get(
        `/users/google/callback${googleQuery}`
      );
      const { data } = response;
      console.log("data:", data);
      localStorage.setItem("token", data.token);
      loading = false;
      console.log(data.message);
      window.location.href = "/account";
    } catch (error) {
      console.log(error.message, " only google authenticated");
    }
  };

  loginWithGoogle();

  return (
    <div className="w-screen flex justify-center items-center h-screen bg-darkTheme z-50">
      <MoonLoader color="#ca8a04" />
    </div>
  );
};

export default GoogleWelcome;
