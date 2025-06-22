import React, { useEffect, useState } from "react";
import {
  getProducts,
  getAllCategories,
} from "../../../services/products/products";
import { getUserById } from "../../../services/auth/users";
import { usePagination } from "../../../hooks/usePagination";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import i18n from "../../common/components/LangConfig";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const {
    activePage,
    nextPage,
    previousPage,
    goToPage,
    totalPages,
    items: paginatedItems,
  } = usePagination(filteredProducts, 1, 5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        const allCategories = await getAllCategories();
        setCategories(allCategories);

        const categoryMap = {};
        allCategories.forEach((cat) => (categoryMap[cat._id] = cat.name));

        const productsWithDetails = await Promise.all(
          fetchedProducts.map(async (product) => {
            const categoryName = categoryMap[product.category] || "No Category";

            let username = "Unknown";
            if (product.user) {
              try {
                const userData = await getUserById(product.user);
                username = `${userData.firstname} ${userData.lastname}`;
              } catch (err) {
                console.error("Error fetching user:", err);
              }
            }

            return { ...product, categoryName, username };
          })
        );

        setProducts(productsWithDetails);
        setFilteredProducts(productsWithDetails);
      } catch (error) {
        console.log(error);
        setError("Error fetching products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.categoryName === selectedCategory
      );
    }

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, minPrice, maxPrice, products]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full text-yellow-500 flex items-center justify-center bg-white dark:bg-darkTheme/10 z-50">
        <FaSpinner className="animate-spin mr-2" />
        <span className="">{i18n.t("dashboard.products.loading")}</span>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="px-6 dark:text-gray-300">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-bold">
          {i18n.t("dashboard.products.allProducts")}
        </h2>
        <div className="flex flex-wrap gap-4 self-end">
          <input
            type="text"
            placeholder={i18n.t("dashboard.products.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border dark:bg-white/10 dark:border-gray-700 border-gray-300 rounded px-2 py-1 w-48 text-sm"
          />

          <input
            type="number"
            placeholder={i18n.t("dashboard.products.minPricePlaceholder")}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border dark:bg-white/10 dark:border-gray-700 border-gray-300 rounded px-2 py-1 w-24 text-sm"
          />
          <input
            type="number"
            placeholder={i18n.t("dashboard.products.maxPricePlaceholder")}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border dark:bg-white/10 dark:border-gray-700 border-gray-300 rounded px-2 py-1 w-24 text-sm"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border dark:bg-neutral-700 dark:border-gray-700 border-gray-300 rounded px-2 py-1 w-48 text-sm"
          >
            <option value="All">
              {i18n.t("dashboard.products.allCategories")}
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full bg-white dark:bg-darkTheme dark:border-gray-700 border border-gray-200">
            <thead className="bg-gray-200 dark:bg-neutral-700 dark:text-gray-300 dark text-gray-600 text-sm sticky top-0">
              <tr>
                <th className="py-3 px-6 text-left">
                  {i18n.t("dashboard.products.image")}
                </th>
                <th className="py-3 px-6 text-left">
                  {i18n.t("dashboard.products.title")}
                </th>
                <th className="py-3 px-6 text-left">
                  {i18n.t("dashboard.products.price")}
                </th>
                <th className="py-3 px-6 text-left">
                  {i18n.t("dashboard.products.moq")}
                </th>
                <th className="py-3 px-6 text-left">
                  {i18n.t("dashboard.products.category")}
                </th>
                <th className="py-3 px-6 text-left">
                  {i18n.t("dashboard.products.quantity")}
                </th>
                <th className="py-3 px-6 text-left">
                  {i18n.t("dashboard.products.owner")}
                </th>
                <th className="py-3 px-6 text-center">
                  {i18n.t("dashboard.products.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    {i18n.t("dashboard.products.noProductsFound")}
                  </td>
                </tr>
              ) : (
                paginatedItems.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/10"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <span>{i18n.t("dashboard.products.noImage")}</span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-left">{product.title}</td>
                    <td className="py-3 px-6 text-left">CFA {product.price}</td>
                    <td className="py-3 px-6 text-left">{product.moq}</td>
                    <td className="py-3 px-6 text-left">
                      {product.categoryName}
                    </td>
                    <td className="py-3 px-6 text-left">{product.quantity}</td>
                    <td className="py-3 px-6 text-left">{product.username}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link to={`/dashboard/products/${product._id}/edit`}>
                          <img
                            src="/icons/edit-icon.svg"
                            alt="Edit"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </Link>
                        <img
                          src="/icons/trash-icon.svg"
                          alt="Delete"
                          className="w-4 h-4 cursor-pointer"
                        />
                        <Link to={`/dashboard/products/${product._id}`}>
                          <img
                            src="/icons/more-icon.svg"
                            alt="More"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={previousPage}
          disabled={activePage === 1}
          className="px-1 py-1 dark:bg-white/10 bg-gray-300 rounded disabled:opacity-50 text-sm"
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
            } rounded `}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={activePage === totalPages}
          className="px-1 py-1 bg-gray-300 dark:bg-white/10 rounded disabled:opacity-50 text-sm"
        >
          {i18n.t("dashboard.next")}
        </button>
      </div>
    </section>
  );
};

export default AllProducts;
