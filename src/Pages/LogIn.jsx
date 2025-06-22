import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SignImg from "./SignImg.png";
import i18n from "../components/common/components/LangConfig";
import customAxios from "../lib/customAxios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleLogin } from "../components/common/components/ui/GoogleLogin"; // Import GoogleLogin

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await customAxios.post("/users/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);

      setSuccess("Login successful!");
      setError(null);
      setOpen(true);
      setTimeout(() => {
        window.location.href = "/account";
      }, 2000);
    } catch (error) {
      setSuccess(null);
      setError(
        error.response?.data.error || "An error occurred while logging in."
      );
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative md:pt-36 dark:bg-white/80 pt-24 flex max-lg:flex-col-reverse justify-center text-slate-700 md:justify-start items-center gap-12 xl:gap-24 ">
      <img src={SignImg} alt="Sign Image" className="img:hidden w-1/2" />
      <div className="flex flex-col gap-6 md:gap-8 md:mx-10 items-center sm:items-start max-lg:mt-40 justify-center">
        <h1 className="text-xl md:text-4xl font-medium ">
          {i18n.t("loginPage.title")}
        </h1>
        <p className="">{i18n.t("loginPage.enter")}</p>

        <form
          className="flex flex-col gap-6 md:gap-8 w-72 md:w-96"
          onSubmit={handleLogIn}
        >
          <TextField
            label={i18n.t("signUpPage.email")}
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
            {i18n.t("signUpPage.password")} <span className="text-red-700">*</span>
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <div className="flex items-center justify-between mt-2">
            <FormControlLabel
              control={<Checkbox />}
              label={i18n.t("loginPage.rememberMe")}
            />
            <button
              type="button"
              className="text-base text-red-700 hover:underline font-medium"
            >
              {i18n.t("loginPage.forgot")}
            </button>
          </div>

          <Button
            type="submit"
            className={`w-full text-white py-3 rounded-md font-semibold mt-4 ${
              isLoading ? "bg-red-600 opacity-50 cursor-wait" : "bg-red-600"
            }`}
            variant="contained"
            sx={{
              backgroundColor: "#09093d",
            }}
          >
            {isLoading ? "Sending..." : i18n.t("loginPage.login")}
          </Button>
        </form>

        {/* Add the GoogleLogin button here */}
        <div className="w-full text-center text-sm">
          <p className="text-slate-500 my-2">{i18n.t("loginPage.or")}</p>
          <GoogleLogin />
        </div>

        <p className="text-gray-600 mx-auto">
          <span>{i18n.t("loginPage.notHaveAccount")} </span>
          <Link
            to="/signUp"
            className="ml-2 text-yellow-500 font-medium hover:underline"
          >
            {i18n.t("signUpPage.title")}
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

export default LogIn;
