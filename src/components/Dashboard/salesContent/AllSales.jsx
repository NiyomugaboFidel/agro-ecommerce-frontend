import React, { useEffect, useState } from "react";
import { useOrders } from "../../../context/OrderContext";
import { FaSpinner } from "react-icons/fa";
import { usePagination } from "../../../hooks/usePagination";
import { getUserById } from "../../../services/auth/users";
import i18n from "../../common/components/LangConfig";

const AllSales = () => {
  const { deliveredOrders } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("");
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState("");
  const [userNames, setUserNames] = useState({});
  console.log("delivered orders==", deliveredOrders);

  // Pagination setup with perPage as 5 items
  const {
    activePage,
    nextPage,
    previousPage,
    goToPage,
    totalPages,
    items: paginatedItems,
  } = usePagination(filteredOrders, 1, 5); // Assuming 5 items per page

  useEffect(() => {
    if (deliveredOrders) {
      setFilteredOrders(deliveredOrders);
      setLoading(false);
      // Fetch user names for each order
      deliveredOrders.forEach(async (order) => {
        if (!userNames[order.user]) {
          const userName = await getUserById(order.user);
          setUserNames((prevNames) => ({
            ...prevNames,
            [order.user]:
              `${userName?.firstname} ${userName?.lastname}` || "Unknown",
          }));
        }
      });
    } else {
      setError("Error fetching deliveredOrders.");
      setLoading(false);
    }
  }, [deliveredOrders]);

  // Filter deliveredOrders based on search term, price, order status, delivery status, and user name
  useEffect(() => {
    let filtered = deliveredOrders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.products.some((product) =>
            product.product.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) ||
          (userNames[order.user] &&
            userNames[order.user]
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          new Date(order.orderDate)
            .toLocaleDateString("en-US")
            .includes(searchTerm)
      );
    }

    if (minPrice) {
      filtered = filtered.filter((order) => order.totalPrice >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((order) => order.totalPrice <= maxPrice);
    }

    if (orderStatusFilter) {
      filtered = filtered.filter(
        (order) => order.orderStatus === orderStatusFilter
      );
    }

    if (deliveryStatusFilter) {
      filtered = filtered.filter((order) =>
        deliveryStatusFilter === "Delivered"
          ? order.deliveryStatus.isDelivered
          : !order.deliveryStatus.isDelivered
      );
    }

    setFilteredOrders(filtered);
  }, [
    searchTerm,
    minPrice,
    maxPrice,
    orderStatusFilter,
    deliveryStatusFilter,
    deliveredOrders,
    userNames,
  ]);

  // Status color classes
  const getOrderStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Shipped":
        return "text-blue-500";
      case "Completed":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getDeliveryStatusClass = (isDelivered) => {
    return isDelivered ? "text-green-500" : "text-red-500";
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full text-yellow-500 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <FaSpinner className="animate-spin mr-2" />
        <span>Loading Orders...</span>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="px-6 dark:bg-darkTheme dark:text-gray-300  bg-gray-100 h-full py-8">
      <div className="flex flex-col gap-4 mb-4 dark:text-gray-300">
        <h2 className="text-xl font-bold"> {i18n.t("dashboard.allSales")}</h2>
        <div className="flex flex-wrap gap-4 self-end dark:text-gray-300">
          <input
            type="text"
            placeholder={i18n.t("dashboard.orders.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border dark:text-gray-300 dark:bg-white/10 dark:border-gray-700 border-gray-300 rounded px-2 py-1 w-48 text-xs"
          />
          <input
            type="number"
            placeholder={i18n.t("dashboard.products.minPricePlaceholder")}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border dark:text-gray-300 dark:bg-white/10 dark:border-gray-700 border-gray-300 rounded px-2 py-1 w-24 text-xs"
          />
          <input
            type="number"
            placeholder={i18n.t("dashboard.products.maxPricePlaceholder")}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border dark:text-gray-300 dark:bg-white/10 dark:border-gray-700 border-gray-300 rounded px-2 py-1 w-24 text-xs"
          />
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="border dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-700 border-gray-300 rounded px-2 py-1 w-32 text-xs text-slate-500"
          >
            <option value="">
              {i18n.t("dashboard.products.minPricePlaceholder")}
            </option>
            <option value="Pending">
              {i18n.t("dashboard.orders.orderStatusOptions.pending")}
            </option>
            <option value="Approved">
              {i18n.t("dashboard.orders.orderStatusOptions.approved")}
            </option>
            <option value="Rejected">
              {i18n.t("dashboard.orders.orderStatusOptions.rejected")}
            </option>
            <option value="Delivered">
              {i18n.t("dashboard.orders.orderStatusOptions.delivered")}
            </option>
          </select>
          <select
            value={deliveryStatusFilter}
            onChange={(e) => setDeliveryStatusFilter(e.target.value)}
            className="border dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-700 border-gray-300 rounded px-2 py-1 w-32 text-xs text-slate-500"
          >
            <option value="">
              {i18n.t("dashboard.orders.deliveryFilterOptions.allDeliveries")}
            </option>
            <option value="Delivered">
              {i18n.t("dashboard.orders.deliveryFilterOptions.delivered")}
            </option>
            <option value="Not Delivered">
              {i18n.t("dashboard.orders.deliveryFilterOptions.notDelivered")}
            </option>
          </select>
        </div>
      </div>

      {/* Overflow wrapper */}
      <div className="w-full overflow-auto">
        <table className="dark:bg-darkTheme dark:border-gray-700 min-w-full bg-white border border-gray-200 table-fixed">
          <thead className="dark:bg-neutral-700 dark:text-gray-300 bg-gray-200 text-gray-600 text-xs">
            <tr>
              <th className="py-3 px-6 text-left">
                {i18n.t("dashboard.orders.orderID")}
              </th>
              <th className="py-3 px-6 text-left">
                {i18n.t("dashboard.orders.orderer")}
              </th>
              <th className="py-3 px-6 text-left">
                {i18n.t("dashboard.orders.products")}
              </th>
              <th className="py-3 px-6 text-left">
                {i18n.t("dashboard.orders.date")}
              </th>
              <th className="py-3 px-6 text-left">
                {i18n.t("dashboard.orders.orderStatus")}
              </th>
              <th className="py-3 px-6 text-left">
                {i18n.t("dashboard.orders.deliveryStatus").slice(0, 9)}...
              </th>
              <th className="py-3 px-6 text-left">
                {i18n.t("dashboard.orders.totalPrice")}
              </th>
              <th className="py-3 px-6 text-left">
                {i18n.t("dashboard.orders.totalQuantity")}
              </th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="dark:text-gray-300 text-gray-600 text-xs font-light">
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No deliveredOrders found.
                </td>
              </tr>
            ) : (
              paginatedItems.map((order) => {
                const totalQuantity = order.products.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                return (
                  <tr
                    key={order._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    <td className="py-3 px-6 text-left">
                      {order._id.slice(0, 9)}...
                    </td>
                    <td className="py-3 px-6 text-left">
                      {userNames[order.user] || "Loading..."}
                    </td>
                    <td className="py-3 px-6 text-left flex gap-1 w-44">
                      <div className="flex gap-1 items-center">
                        {order.products.slice(0, 3).map((product, index) => (
                          <div key={index} className="flex items-center">
                            <img
                              src={product.product.images[0]}
                              alt={`Product ${index}`}
                              className="w-[25px] h-[25px] object-cover rounded-full"
                            />
                          </div>
                        ))}
                      </div>
                      {order.products.length} item(s)
                    </td>
                    <td className="py-3 px-6 text-left">
                      {new Date(order.orderDate).toLocaleDateString("en-US")}
                    </td>
                    <td
                      className={`py-3 px-6 text-left ${getOrderStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </td>
                    <td
                      className={`py-3 px-6 text-left ${getDeliveryStatusClass(
                        order.deliveryStatus.isDelivered
                      )}`}
                    >
                      {order.deliveryStatus.isDelivered
                        ? "Delivered"
                        : "Not Delivered"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.totalPrice.toLocaleString()} CFA
                    </td>
                    <td className="py-3 px-6 text-left">
                      {totalQuantity} Units
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <img
                          src="/icons/edit-icon.svg"
                          alt="Edit"
                          className="w-4 h-4 cursor-pointer"
                        />
                        <img
                          src="/icons/trash-icon.svg"
                          alt="Delete"
                          className="w-4 h-4 cursor-pointer"
                        />
                        <img
                          src="/icons/more-icon.svg"
                          alt="More"
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={previousPage}
          disabled={activePage === 1}
          className="px-1 py-1 bg-gray-300 dark:bg-white/10 rounded disabled:opacity-50 text-sm"
        >
          {i18n.t("dashboard.previous")}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`px-2 py-1 mx-1 text-sm ${
              activePage === index + 1
                ? "bg-green-500 text-white"
                : "bg-gray-300 dark:bg-white/10"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={activePage === totalPages}
          className="px-1 py-1 dark:bg-white/10 bg-gray-300 rounded disabled:opacity-50 text-sm"
        >
          {i18n.t("dashboard.next")}
        </button>
      </div>
    </section>
  );
};

export default AllSales;
