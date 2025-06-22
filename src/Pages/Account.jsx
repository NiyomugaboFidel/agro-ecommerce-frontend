import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { useDropzone } from "react-dropzone";
import customAxios from "../lib/customAxios";
import ActiveLastBreadcrumb from "../components/common/components/Link";
import i18n from "../components/common/components/LangConfig";
const Account = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await customAxios.get("/users/me");
        const data = userData.data;
        setFetchedData(data);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setRole(data.role);
        setPhoneNumber(data.phoneNumber);
        setProvince(data.location.province);
        setCity(data.location.city);
        setStreet(data.location.street);
        setZipcode(data.location.zipcode);
        setProfilePic(data.profilePic);
        setIsActive(data.isActive);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setProfilePic(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("phoneNumber", phoneNumber);
      formData.append("province", province);
      formData.append("city", city);
      formData.append("street", street);
      formData.append("zipcode", zipcode);
      formData.append("isActive", isActive);
      if (profilePic) formData.append("profilePic", profilePic);

      await customAxios.put("/users/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(i18n.t("accountPage.setMassage"));
      setOpen(true);
      window.location.reload()
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col md:mx-20 pt-36 gap-20 justify-center md:justify-between dark:text-gray-300 text-gray-700">
      <div className="flex justify-between flex-col gap-4 md:flex-row">
        <div className="w-fit bg-white/30">
        <ActiveLastBreadcrumb
          path={`${i18n.t("accountPage.home")}/ ${i18n.t(
            "accountPage.myAccount"
          )}`}
        />
        </div>
        <h1 className="text-sm md:mr-44">
          {i18n.t("accountPage.welcome")}{" "}
          <span className="text-red-600">
            {fetchedData?.firstname} {fetchedData?.lastname}
          </span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-28 mx-auto w-full">
        <nav className="flex flex-col gap-4 text-gray-400">
          <h1 className="text-black dark:text-white/80 text-sm md:text-base font-medium">
            {i18n.t("accountPage.ManageMyAccount")}
          </h1>
          <ul>
            <li className="px-4 py-2">
              <Link
                to="/account"
                className="hover:underline hover:underline-offset-8 ease-in-out duration-300 transform focus:text-red-600"
              >
                {i18n.t("accountPage.myProfile")}
              </Link>
            </li>
          </ul>
          <h1 className="text-black dark:text-white/80 text-sm md:text-base font-medium">
            {i18n.t("accountPage.myOrders")}
          </h1>
          <ul>
            <li className="px-4 py-2">
              <Link
                to="/account"
                className="hover:underline hover:underline-offset-8 ease-in-out duration-300 transform focus:text-red-600"
              >
                {i18n.t("accountPage.myReturns")}
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link
                to="/account"
                className="hover:underline hover:underline-offset-8 ease-in-out duration-300 transform focus:text-red-600"
              >
                {i18n.t("accountPage.myCancelations")}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="shadow w-full flex flex-col py-10 px-5 rounded">
          <div className="flex flex-col gap-6 md:w-[710px]">
            <span className="text-xl font-medium text-red-600">
              {i18n.t("accountPage.editYourProfile")}
            </span>
            {fetchedData?.profilePic && (
              <div className="flex justify-center">
                <img
                  src={fetchedData?.profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-6 md:gap-[20px] justify-between">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.firstName")}
                </span>
                <input
                  type="text"
                  placeholder="your first name"
                  required
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 dark:bg-white/10 dark:border dark:border-gray-900 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.lastName")}
                </span>
                <input
                  type="text"
                  placeholder="your last name"
                  required
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="rounded bg-gray-100 dark:bg-white/10 dark:border dark:border-gray-900 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-[20px] justify-between">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.email")}
                </span>
                <input
                  type="email"
                  placeholder="your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 dark:bg-white/10 dark:border dark:border-gray-900 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.phoneNumber")}
                </span>
                <input
                  type="text"
                  placeholder="your phone number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 dark:bg-white/10 dark:border dark:border-gray-900 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-[20px] justify-between">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.province")}
                </span>
                <input
                  type="text"
                  placeholder="your province"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 dark:bg-white/10 dark:border dark:border-gray-900 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.city")}
                </span>
                <input
                  type="text"
                  placeholder="your city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 dark:bg-white/10 dark:border dark:border-gray-900 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-[20px] justify-between">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.street")}
                </span>
                <input
                  type="text"
                  placeholder="your street"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 dark:bg-white/10 dark:border dark:border-gray-900 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="text-sm md:text-base">
                  {i18n.t("accountPage.zipcode")}
                </span>
                <input
                  type="text"
                  placeholder="your zipcode"
                  required
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="rounded bg-gray-100 px-4 py-3 dark:bg-white/10 dark:border dark:border-gray-900 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-sm md:text-base">
                {i18n.t("accountPage.profilePic")}
              </span>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 rounded bg-gray-100 dark:bg-white/10 px-4 py-10 text-gray-400 text-center"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>{i18n.t("accountPage.drop")} {"..."}</p>
                ) : (
                  <p>{i18n.t("accountPage.dragNdrop")}</p>
                )}
                {profilePic && <p>{i18n.t("accountPage.select")}: {profilePic.name}</p>}
              </div>
            </div>
            <button
              className={`${loading ? "cursor-wait opacity-60":""}bg-red-600 text-white rounded px-4 py-3 text-sm md:text-base focus:border outline-none focus:border-gray-300`}
              onClick={handleSaveChanges}
              disabled={loading}
            >
              {loading ? "Saving..." : i18n.t("accountPage.saveChanges")}
            </button>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={error ? "error" : "success"}
        >
          {error ? error : message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Account;
