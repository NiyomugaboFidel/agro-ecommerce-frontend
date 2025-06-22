import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Grid, Typography } from "@mui/material";
import { getOrdersByUser, cancelOrder } from "../services/orders/orders"; // Assuming you have this service
import ActiveLastBreadcrumb from "../components/common/components/Link";
import i18n from "../components/common/components/LangConfig";
import OrderCard from "../components/common/components/ui/OrderCard";
import { useOrders } from "../context/OrderContext";
import { MoonLoader } from "react-spinners";

const OrderPage = () => {
  const { fetchOrders } = useOrders();
  const [userOrders, setUserOrders] = useState([]);
  const [notDeliveredOrders, setNotDeliveredOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const orders = await getOrdersByUser();
        setUserOrders(orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
  }, []);

  useEffect(() => {
    if (userOrders.length > 0) {
      // Filter orders based on delivery status and order status
      const notDelivered = userOrders.filter(
        (order) =>
          !order.deliveryStatus.isDelivered && order.orderStatus !== "Cancelled"
      );
      const delivered = userOrders.filter(
        (order) => order.deliveryStatus.isDelivered
      );
      const canceled = userOrders.filter(
        (order) => order.orderStatus === "Cancelled"
      );

      setNotDeliveredOrders(notDelivered);
      setDeliveredOrders(delivered);
      setCanceledOrders(canceled);
    }
  }, [userOrders]);

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      // Update orders list by refetching orders or locally updating the state
      const updatedOrders = userOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: "Cancelled" } : order
      );
      await fetchOrders();
      setUserOrders(updatedOrders);
    } catch (error) {
      console.log("Failed to cancel order", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "#FFF4E5",
          color: "#FFA726",
          fontWeight: 600,
        };
      case "Shipped":
        return {
          backgroundColor: "#E3F2FD",
          color: "#42A5F5",
          fontWeight: 600,
        };
      case "Delivered":
        return {
          backgroundColor: "#E8F5E9",
          color: "#66BB6A",
          fontWeight: 600,
        };
      case "Cancelled":
        return {
          backgroundColor: "#FFEBEE",
          color: "#EF5350",
          fontWeight: 600,
        };
      default:
        return {
          backgroundColor: "#F5F5F5",
          color: "#BDBDBD",
          fontWeight: 600,
        };
    }
  };

  return (
    <section className="md:max-w-7xl w-full min-h-screen h-fit md:px-20 px-4 pt-36 flex flex-col gap-10 bg-white dark:bg-darkTheme text-gray-700 dark:text-gray-300">
      <div className="bg-white/30 w-fit">
        <ActiveLastBreadcrumb
          path={`${i18n.t("allProducts.products")}/${i18n.t(
            "allProducts.orders"
          )}`}
        />
      </div>
      {loading ? (
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <div className="dark:hidden">
            <MoonLoader />
          </div>
          <MoonLoader color="#fff" />
        </div>
      ) : (
        <div className="md:px-5">
          {/* Undelivered Orders as Cards */}
          <h2 className="text-xl font-bold mb-8 xs:mb-4">
            {i18n.t(`orderPage.underivered`)}
          </h2>
          <Grid container spacing={2}>
            {notDeliveredOrders.length > 0 ? (
              notDeliveredOrders.map((order) => (
                <Grid item xs={12} sm={6} md={4} key={order._id}>
                  <OrderCard
                    order={order}
                    getStatusStyle={getStatusStyle}
                    handleCancelOrder={handleCancelOrder}
                  />
                </Grid>
              ))
            ) : (
              <div className="w-full h-[30vh] bg-gray-100 dark:bg-gray-100/10 flex justify-center items-center dark:text-gray-300 text-gray-500">
                {i18n.t(`orderPage.underivNotFound`)}
              </div>
            )}
          </Grid>

          {/* Delivered Orders as Cards */}
          <h2 className="text-xl font-bold mt-8 mb-8 xs:mb-4">
            {i18n.t(`orderPage.derivered`)}
          </h2>
          <Grid container spacing={2}>
            {deliveredOrders.length > 0 ? (
              deliveredOrders.map((order) => (
                <Grid item xs={12} sm={6} md={4} key={order._id}>
                  <OrderCard
                    order={order}
                    getStatusStyle={getStatusStyle}
                    handleCancelOrder={handleCancelOrder}
                  />
                </Grid>
              ))
            ) : (
              <div className="w-full h-[30vh] bg-gray-100 dark:bg-gray-100/10 flex justify-center items-center dark:text-gray-300 text-gray-500">
                {i18n.t(`orderPage.derivNotFound`)}
              </div>
            )}
          </Grid>

          {/* Canceled Orders as Cards */}
          <h2 className="text-xl font-bold mt-8 mb-8 xs:mb-4">
            {i18n.t(`orderPage.canceled`)}
          </h2>
          <Grid container spacing={2}>
            {canceledOrders.length > 0 ? (
              canceledOrders.map((order) => (
                <Grid item xs={12} sm={6} md={4} key={order._id}>
                  <OrderCard
                    order={order}
                    getStatusStyle={getStatusStyle}
                    handleCancelOrder={handleCancelOrder}
                  />
                </Grid>
              ))
            ) : (
              <div className="w-full h-[30vh] bg-gray-100 dark:bg-gray-100/10 flex justify-center items-center dark:text-gray-300 text-gray-500">
                {i18n.t(`orderPage.cancelNotFound`)}
              </div>
            )}
          </Grid>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
