import i18n from "../components/common/components/LangConfig";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import CheckoutCartItem from "../components/Checkout/CheckoutCartItem";
import RedButton from "../components/common/components/RedButton";
import ActiveLastBreadcrumb from "../components/common/components/Link";
import getUserInfo from "../lib/userInfo";
import customAxios from "../lib/customAxios";
import { Snackbar, Alert } from "@mui/material";
import SuccessPopup from "../components/common/components/ui/PopUpOrder";
import { useOrders } from "../context/OrderContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { fetchOrders } = useOrders();
  const { cartItems, totalItems, totalPrice, fetchCart } = useCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const user = getUserInfo();

  useEffect(() => {
    if (user) {
      setFirstName(user.data.firstname);
      setLastName(user.data.lastname);
      setEmail(user.data.email);
    }
  }, [user]);

  const token = localStorage.getItem("token") || "";

  const createPaymentSession = async (orderId, amount, customerEmail, userId) => {
    try {
      const paymentData = {
        orderId: orderId,
        amount: Math.round(amount * 100), // Convert to cents for Stripe
        currency: "usd",
        productName: "Order Products",
        productDescription: `Payment for order #${orderId}`,
        quantity: 1,
        customerEmail: customerEmail,
        metadata: {
          userId: userId,
          orderDate: new Date().toISOString(),
          paymentMethod: "Credit Card"
        }
      };

      const response = await customAxios.post(
        "/stripe/create-payment-session",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && response.data.url) {
        // Redirect to Stripe checkout page
        window.location.href = response.data.url;
      } else {
        throw new Error("Failed to create payment session");
      }
    } catch (error) {
      console.error("Error creating payment session:", error);
      setSeverity("error");
      setMessage("Error creating payment session");
      setSnackbarOpen(true);
      toast.error("Error creating payment session");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Create order first
      const response = await customAxios.post(
        "/orders",
        {
          street: address,
          city,
          postalCode,
          country,
          province,
          district,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderId = response.data.orderId || response.data._id || response.data.id;
      
      if (!orderId) {
        throw new Error("Order ID not found in response");
      }

      setSeverity("success");
      setMessage("Order created successfully");
      setSnackbarOpen(true);
      toast.success("Order created successfully");

      // Clear form fields
      setAddress("");
      setCity("");
      setPostalCode("");
      setCountry("");
      setProvince("");
      setDistrict("");
      
      // Fetch updated cart and orders
      fetchCart();
      await fetchOrders();

      // Create payment session and redirect to Stripe
      setTimeout(() => {
        createPaymentSession(orderId, totalPrice, email, user?.data?.id || user?.data?._id);
      }, 1000); // Small delay to ensure order is fully processed

    } catch (error) {
      setSeverity("error");
      setMessage("Error creating order");
      setSnackbarOpen(true);
      toast.error("Error creating order");
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="md:max-w-7xl mx-auto pt-36 md:pt-36 dark:text-gray-300 md:px-20 flex flex-col md:gap-10">
      <div className="w-fit bg-white/20">
        <ActiveLastBreadcrumb
          path={`${i18n.t("home")}/${i18n.t("redButtons.applyCoupon")}`}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex mt-4 md:flex-row flex-col gap-10 md:gap-20">
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col gap-4 md:gap-12">
              <span className="text-2xl md:text-4xl font-medium">
                {i18n.t("checkOut.billingDetails")}
              </span>

              {/* Grid layout for 2x2 input fields */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 w-[300px] md:w-[470px]">
                {/* Billing Details Inputs */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {i18n.t("checkOut.firstName")} <span className="text-red-700">*</span>
                  </span>
                  <input
                    type="text"
                    value={firstName}
                    disabled
                    className="rounded bg-gray-100 dark:bg-white/10 dark:text-gray-300 border border-gray-600 px-4 py-3 text-gray-700 text-sm md:text-base focus:border-gray-300 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {i18n.t("accountPage.lastName")} <span className="text-red-700">*</span>
                  </span>
                  <input
                    type="text"
                    value={lastName}
                    disabled
                    className="rounded bg-gray-100 dark:bg-white/10 dark:text-gray-300 border border-gray-600 px-4 py-3 text-gray-700 text-sm md:text-base focus:border-gray-300 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {i18n.t("checkOut.email")} <span className="text-red-700">*</span>
                  </span>
                  <input
                    type="text"
                    value={email}
                    disabled
                    className="rounded bg-gray-100 dark:bg-white/10 dark:text-gray-300 border border-gray-600 px-4 py-3 text-gray-700 text-sm md:text-base focus:border-gray-300 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {i18n.t("checkOut.address")}<span className="text-red-700">*</span>
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="rounded bg-gray-100 dark:bg-white/10 dark:text-gray-300 border border-gray-600 px-4 py-3 text-gray-700 text-sm md:text-base focus:border-gray-300 outline-none"
                  />
                </div>
                {/* Other Inputs */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {i18n.t("checkOut.city")} <span className="text-red-700">*</span>
                  </span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="rounded bg-gray-100 dark:bg-white/10 dark:text-gray-300 border border-gray-600 px-4 py-3 text-gray-700 text-sm md:text-base focus:border-gray-300 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {i18n.t("checkOut.postalCode")} <span className="text-red-700">*</span>
                  </span>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="rounded bg-gray-100 dark:bg-white/10 dark:text-gray-300 border border-gray-600 px-4 py-3 text-gray-700 text-sm md:text-base focus:border-gray-300 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {i18n.t("checkOut.province")} <span className="text-red-700">*</span>
                  </span>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                    className="rounded bg-gray-100 dark:bg-white/10 dark:text-gray-300 border border-gray-600 px-4 py-3 text-gray-700 text-sm md:text-base focus:border-gray-300 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {i18n.t("checkOut.district")} <span className="text-red-700">*</span>
                  </span>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="rounded bg-gray-100 dark:bg-white/10 dark:text-gray-300 border border-gray-600 px-4 py-3 text-gray-700 text-sm md:text-base focus:border-gray-300 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {i18n.t("checkOut.country")} <span className="text-red-700">*</span>
                  </span>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="rounded bg-gray-100 dark:bg-white/10 dark:text-gray-300 border border-gray-600 px-4 py-3 text-gray-700 text-sm md:text-base focus:border-gray-300 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex justify-between flex-col gap-4 md:gap-8 px-4 w-full md:w-[425px] h-fit">
            {cartItems.map((item) => (
              <CheckoutCartItem key={item.product._id} item={item} />
            ))}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between border-b">
                <p className="text-base">{i18n.t("cart.totalItems")}:</p>
                <p className="text-base">{totalItems.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between border-b">
                <p className="text-base">{i18n.t("cart.total")}:</p>
                <p className="text-base">CFA {totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-10 mb-4 md:mb-12 justify-start">
          <RedButton
            name={loading ? "Processing..." : i18n.t("redButtons.createOrder")}
            width={300}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>

      <SuccessPopup open={popupOpen} handleClose={() => setPopupOpen(false)} />
    </div>
  );
};

export default Checkout;