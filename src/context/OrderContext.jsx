import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import customAxios from "../lib/customAxios";
import { getAllDeliveredOrders, getAllOrders, getOrdersByUser } from "../services/orders/orders"; // Import necessary services

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found in localStorage");
        return;
      }
      const orderData = await getAllOrders();
      if (orderData && Array.isArray(orderData)) {
        setOrders(orderData);
      } else {
        setOrders([]); // Ensure cartItems is an empty array if no products are returned
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error);
      setLoading(false);
    }
  };
  const fetchDeliveredOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
      return;
    }
    try {
      const deliverOrdersData = await getAllDeliveredOrders();
      if (deliverOrdersData && Array.isArray(deliverOrdersData)) {
        setDeliveredOrders(deliverOrdersData);
      } else {
        setDeliveredOrders([]); // Ensure cartItems is an empty array if no products are returned
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
    fetchDeliveredOrders();
  }, []);
  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      setError(error);
    }
  };

  const handleRemoveOrder = async (orderId) => {
    try {
      await removeOrder(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error removing order:", error);
      setError(error);
    }
  };



  return (
    <OrderContext.Provider
      value={{
        orders,
        deliveredOrders,
        loading,
        error,
        fetchOrders,
        fetchDeliveredOrders,
        handleUpdateOrderStatus,
        handleRemoveOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
