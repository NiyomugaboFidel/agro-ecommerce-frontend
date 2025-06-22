import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import SignImg from "./SignImg.png";
import i18n from "../components/common/components/LangConfig";
import customAxios from "../lib/customAxios";
import { GoogleLogin } from "../components/common/components/ui/GoogleLogin";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await customAxios.post("/users/signup", formData);
      setSuccess("Account created successfully!");
      console.log(response);
      setError(null);
      setOpen(true);
      setTimeout(() => {
        router("/login");
      }, 2000);
    } catch (error) {
      setSuccess(null);
      setError(
        error.response?.data.error ||
          "An error occurred while creating the account."
      );
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex dark:bg-white/80 flex-col lg:flex-row justify-center text-slate-700 items-center md:pt-36 pt-24 xl:gap-6 min-h-screen">
      <img src={SignImg} alt="Sign Image" className="w-full lg:w-1/2 img:hidden img" />
      <div className="flex flex-col gap-6 md:gap-8 items-center justify-center w-full lg:w-1/2 px-4">
        <h1 className="text-4xl font-medium">{i18n.t("signUpPage.title")}</h1>
        <form
          className="flex flex-col gap-6 w-full max-w-lg"
          onSubmit={handleSignUp}
        >
          <div className="flex w-full gap-6">
            <TextField
              name="firstname"
              type="text"
              label={i18n.t("signUpPage.firstname")}
              // variant="standard"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="w-full text-sm"
              sx={{
                borderBlockColor: "blue",
              }}
            />
            <TextField
              name="lastname"
              type="text"
              label={i18n.t("signUpPage.lastname")}
              // variant="standard"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <TextField
            name="email"
            label={i18n.t("signUpPage.email")}
            // variant="standard"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="phoneNumber"
            type="text"
            label={i18n.t("signUpPage.phoneNumber")}
            // variant="standard"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label={i18n.t("signUpPage.password")}
            // variant="standard"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            className={`w-full text-white py-3 rounded-md font-semibold mt-4 ${
              isLoading ? "bg-red-600 opacity-50 cursor-wait" : "bg-red-600"
            }`}
            variant="contained"
            // disabled={isLoading} // Disable the button when loading
            sx={{
              backgroundColor: "#09093d",
            }}
          >
            {isLoading ? "Sending..." : i18n.t("signUpPage.createAccount")}
          </Button>
        </form>
        <div className="w-full text-center text-sm">
          <p className="text-slate-500 my-2">Or Sign Up with Google</p>
          <GoogleLogin />
        </div>
        <p className="text-gray-600 mt-4">
          {i18n.t("signUpPage.haveAccount")}{" "}
          <Link
            to="/login"
            className="ml-2 text-yellow-500 font-medium hover:underline"
          >
            {i18n.t("signUpPage.login")}
          </Link>
        </p>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        {success ? (
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        ) : (
          <Alert
            onClose={() => setOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default SignUp;
