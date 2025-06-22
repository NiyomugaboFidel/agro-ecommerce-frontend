import React, { useState, useEffect, useCallback } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import customAxios from "../../../../lib/customAxios";
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import {ScaleLoader} from "react-spinners"
import i18n from "../LangConfig";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  const performSearch = useCallback(
    debounce(async (query, filter) => {
      setIsSearching(true);

      const queryParams = new URLSearchParams();

      if (filter === "all" && query) {
        queryParams.append("title", query);
      } else if (filter === "category" && query) {
        queryParams.append("categoryName", query);
      } else if (filter === "minPrice" && query) {
        queryParams.append("minPrice", query);
      } else if (filter === "maxPrice" && query) {
        queryParams.append("maxPrice", query);
      }

      const url = `/products/search?${queryParams.toString()}`;

      try {
        const response = await customAxios.get(url);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }

      setIsSearching(false);
    }, 500),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      performSearch(searchTerm, filter);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, filter, performSearch]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleProductClick = (productId) => {
    setSearchTerm("");
    navigate(`/allProducts/${productId}`);
  };

  return (
    <section className="flex items-center justify-center relative">
      <div className="relative flex w-[300px] max-w-[350px] xs:w-full">
        <div className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInput}
            className="peer shadow-inner block w-full rounded-l-full border dark:text-gray-300 border-red-200 dark:border-gray-700 py-[12px] pl-5 text-sm outline-2 placeholder:text-gray-500 text-black dark:bg-transparent"
            placeholder={i18n.t("Search.placeholder")}
          />
        </div>

        <select
          value={filter}
          onChange={handleFilterChange}
          className="w-[100px] rounded-r-md  border border-primary dark:border-gray-700 py-2 px-2 shadow-inner outline-none text-xs font-bold text-white bg-primary dark:bg-gray-700/70"
        >
          <option value="all">{i18n.t("Search.all")}</option>
          <option value="category">{i18n.t("Search.category")}</option>
          <option value="minPrice">{i18n.t("Search.min")}</option>
          <option value="maxPrice">{i18n.t("Search.max")}</option>
        </select>
      </div>

      {searchTerm && (
        <div className="absolute top-full mt-2 w-full max-w-[350px] bg-white shadow-lg p-4 rounded-lg z-10 max-h-[300px] overflow-y-scroll">
          {isSearching ? (
            <div className="w-full flex items-center justify-center"><ScaleLoader height={14} width={4} color="#d1d5db"/></div>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((product) => (
                <li
                  key={product._id}
                  className="border-b pb-1 border-slate-400 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{product.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Search;
