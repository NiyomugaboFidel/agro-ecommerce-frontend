
// import { useState } from "react";
import { Container, Grid, Typography, Snackbar, Alert } from "@mui/material";
import QrCode from "./QrCode.png";
import GooglePlay from "./GooglePlay.png";
import AppStore from "./AppStore.png";
import i18n from "../common/components/LangConfig";
import { Link } from "react-router-dom";
const Footer = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  // const [open, setOpen] = useState(false);

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Attempt to create a new user account
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );

  //     // Send email verification
  //     await sendEmailVerification(userCredential.user);

  //     setSuccess("Account created successfully! Verification email sent.");
  //     setOpen(true);
  //   } catch (error) {
  //     // Handle specific errors
  //     if (error.code === "auth/email-already-in-use") {
  //       setSuccess("");
  //       setError("The email address is already in use.");
  //     } else {
  //       setError(error.message); // Handle other errors generically
  //     }
  //     setOpen(true);
  //   }
  // };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling behavior
    });
  };
  return (
    <footer className="bg-primary text-white py-8 mt-24 bottom-0 w-full font-outfit">
      <Container>
        <Grid
          container
          direction="row"
          spacing={4}
          className="md:min-h-96 justify-start items-stretch md:justify-between"
        >
          <Grid
            item
            sm={6}
            md={2.5}
            className="justify-center items-stretch md:justify-between md:leading-10"
          >
            <h1 className="font-medium text-3xl mb-3">
              Exclusive
            </h1>
            <Typography className="font-medium" gutterBottom>
              {i18n.t("footer.subscribe")}
            </Typography>
            <Typography variant="body2">{i18n.t("footer.offer")}</Typography>
          </Grid>

          {/* Support */}
          <Grid
            item
            xs={8}
            sm={6}
            md={2.5}
            className="justify-center items-stretch md:justify-between md:leading-10"
          >
            <h1 className="font-medium text-3xl mb-3">
              {i18n.t("footer.support")}
            </h1>
            {/* <Typography gutterBottom>{i18n.t("footer.address")}</Typography> */}
            <Typography variant="body2">abbas@gmail.com</Typography>
            <Typography variant="body2">+250 786639348</Typography>
          </Grid>

          {/* Account */}
          <Grid
            item
            xs={8}
            sm={6}
            md={2}
            className="justify-center items-stretch md:justify-between md:leading-10"
          >
            <h1 className="font-medium text-3xl mb-3">
              {i18n.t("footer.account")}
            </h1>
            <ul className="list-none p-0">
              <li>
                <Link
                  onClick={scrollToTop}
                  to="/account"
                  sx={{ color: "white" }}
                >
                  {i18n.t("footer.myAccount")}
                </Link>
              </li>
              <li>
                <Link
                  onClick={scrollToTop}
                  to="/signup"
                  sx={{ color: "white" }}
                >
                  {i18n.t("footer.sign")}
                </Link>
              </li>
              <li>
                <Link onClick={scrollToTop} to="/cart" sx={{ color: "white" }}>
                  {i18n.t("footer.cart")}
                </Link>
              </li>
              <li>
                <Link
                  onClick={scrollToTop}
                  to="/wishlist"
                  sx={{ color: "white" }}
                >
                  {i18n.t("footer.wishlist")}
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Quick Link */}
          <Grid
            item
            xs={8}
            sm={6}
            md={2}
            className="justify-center items-stretch md:justify-between md:leading-10"
          >
            <h1 className="font-medium text-3xl mb-3">
              {i18n.t("footer.quickLinks")}
            </h1>
            <ul className="list-none p-0">
              <li>
                <Link to="/allProducts" sx={{ color: "white" }}>
                  {i18n.t("allProducts.redTitle")}
                </Link>
              </li>

              <li>
                <Link onClick={scrollToTop} to="about" sx={{ color: "white" }}>
                  {i18n.t("footer.usage")}
                </Link>
              </li>
              <li>
                <Link onClick={scrollToTop} to="about" sx={{ color: "white" }}>
                  {i18n.t("footer.FAQ")}
                </Link>
              </li>
              <li>
                <Link
                  onClick={scrollToTop}
                  to="/contact"
                  sx={{ color: "white" }}
                >
                  {i18n.t("footer.Contact")}
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Download App */}
          <Grid
            item
            xs={8}
            sm={6}
            md={2}
            className="justify-center items-stretch md:justify-between md:leading-10"
          >
          </Grid>
        </Grid>
      </Container>
      {/* Copyright */}
      <hr className="w-full border-gray-800 my-4" />
      <Typography variant="body2" className=" text-center text-gray-600">
        {i18n.t("footer.copyrights")}
      </Typography>

    </footer>
  );
};

export default Footer;
