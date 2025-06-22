import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById, updateOrderStatus, updateOrderDeliveryStatus } from "../../services/orders/orders";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useOrders } from "../../context/OrderContext";
import i18n from "../../components/common/components/LangConfig";


const DashOrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingDelivery, setUpdatingDelivery] = useState(false);
  const {fetchOrders,fetchDeliveredOrders}=useOrders()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleStatusUpdate = async (status) => {
    setUpdatingStatus(true);
    try {
      const data = await updateOrderStatus(orderId, status);
      toast.success(`${i18n.t("dashboard.orderComp.orderStatusUpdated")}`)
      setOrder(data);
      await fetchOrders()
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error(`${i18n.t("dashboard.orderComp.failedToUpdateOrderStatus")}`)
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeliveryUpdate = async () => {
    setUpdatingDelivery(true);
    try {
      const data = await updateOrderDeliveryStatus(orderId);
      toast.success(`${i18n.t("dashboard.orderComp.deliveryConfirmed")}`)
      setOrder(data);
      await fetchOrders()
      await fetchDeliveredOrders()
    } catch (error) {
      toast.error(`${i18n.t("dashboard.orderComp.failedToUpdateDeliveryStatus")}`)
      console.error("Failed to update delivery status:", error);
    } finally {
      setUpdatingDelivery(false);
    }
  };

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center"><MoonLoader /></div>;
  }

  if (!order) {
    return <div>{i18n.t("dashboard.orderComp.noOrderFound")}</div>;
  }

  return (
    <section className="p-4 space-y-8 text-gray-700 my-8 min-h-screen dark:text-gray-300">
      <div className="text-sm mb-4 flex w-full justify-between items-center">
        <Link to={`/dashboard/orders`} className="bg-gray-700 text-white px-4 py-2 hover:bg-gray-600 transition">
        {i18n.t("dashboard.orderComp.backToOrders")}
        </Link>
      </div>

      <div className="flex w-full gap-11">
        {/* Shipping Address */}
        <div className="p-4 border border-gray-200 dark:border-gray-700  rounded-lg shadow-sm w-full text-sm">
          <h1 className="text-xl font-bold">{i18n.t("dashboard.orderComp.shippingAddress")}</h1>
          <p>{i18n.t("dashboard.orderComp.street")}: {order.shippingAddress?.street}</p>
          <p>{i18n.t("dashboard.orderComp.city")}: {order.shippingAddress?.city}</p>
          <p>{i18n.t("dashboard.orderComp.province")}: {order.shippingAddress?.province}</p>
          <p>{i18n.t("dashboard.orderComp.district")}: {order.shippingAddress?.district}</p>
        </div>

        {/* Order Information */}
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm w-full text-sm">
          <h1 className="text-xl font-bold">{i18n.t("dashboard.orderComp.orderInformation")}</h1>
          <p>{i18n.t("dashboard.orderComp.orderStatus")}: {order.orderStatus}</p>
          <p>{i18n.t("dashboard.orderComp.totalPrice")}: CFA {order.totalPrice}</p>
          <p>{i18n.t("dashboard.orderComp.paymentMethod")}: {order.paymentMethod}</p>

          {/* Status Buttons */}
          {order.orderStatus !== "Cancelled" && (
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleStatusUpdate("Approved")}
                disabled={updatingStatus || order.orderStatus === "Approved" || order.deliveryStatus?.isDelivered}
                className={`px-2 py-2 rounded-md text-orange-600 text-sm font-semibold ${updatingStatus || order.orderStatus === "Approved" || order.deliveryStatus?.isDelivered ? "border border-orange-600 text-gray-600 dark:border-gray-700 dark:text-gray-400  cursor-not-allowed" : "border border-orange-400 dark:border-gray-700 dark:text-gray-300 text-orange-500 hover:bg-orange-500 hover:text-white transition"}`}
              >
                {updatingStatus && order.orderStatus !== "Approved" ? `${i18n.t("dashboard.orderComp.approving")}` : `${i18n.t("dashboard.orderComp.approveOrder")}`}
              </button>

              <button
                onClick={() => handleStatusUpdate("Rejected")}
                disabled={updatingStatus || order.orderStatus === "Rejected" || order.deliveryStatus?.isDelivered}
                className={`px-2 rounded-md text-sm font-semibold ${updatingStatus || order.orderStatus === "Rejected" || order.deliveryStatus?.isDelivered ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition"}`}
              >
                {updatingStatus && order.orderStatus !== "Rejected" ? `${i18n.t("dashboard.orderComp.rejecting")}` : `${i18n.t("dashboard.orderComp.rejectOrder")}`}
              </button>
            </div>
          )}

          {/* Delivery Status Button */}
          {order.orderStatus === "Approved" && order.deliveryStatus?.isDelivered === false && (
            <div className="mt-4">
              <button
                onClick={handleDeliveryUpdate}
                disabled={updatingDelivery || order.deliveryStatus?.adminConfirmed}
                className={`px-4 py-2 rounded-md text-white ${updatingDelivery || order.deliveryStatus?.adminConfirmed ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 transition"}`}
              >
                {updatingDelivery ? `${i18n.t("dashboard.orderComp.confirmingDelivery")}` : `${i18n.t("dashboard.orderComp.confirmDelivery")}`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="w-full">
        <h1 className="mb-4 font-bold text-xl">{i18n.t("dashboard.orderComp.products")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {order.products?.map((item) => (
            <div key={item._id} className="relative mx-2">
              <div className="relative rounded flex items-center justify-center bg-zinc-100 dark:bg-white/10 w-[270px] h-80 md:h-60 transform transition-transform duration-300 hover:scale-105 focus:outline-none hover:-translate-y-2">
                <Link to={{ pathname: `/products/${item.product.id}` }} key={item.product.id}>
                  <img
                    loading="lazy"
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="hover:animate-pulse max-h-52 w-full object-contain"
                  />
                </Link>
              </div>
              <div className="flex md:items-start items-center flex-col text-sm">
                <h3 className="text-lg font-bold mt-4">{item.product.title}</h3>
                <p>{i18n.t("dashboard.orderComp.price")}: CFA {item.product.price}</p>
                <p>{i18n.t("dashboard.orderComp.quantity")}: {item.quantity} {item.product.unit || "Units"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashOrderPage;
