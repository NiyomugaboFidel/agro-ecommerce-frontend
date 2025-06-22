import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = ({placeholder,value,handleSearch}) => {

  return (
    <section className="flex justify-center items-center flex-col">
      <div className="relative flex w-[300px] max-w-[350px] xs:w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          value={value}
          className="peer shadow-inner block w-full rounded-md border dark:text-gray-300 dark:bg-transparent border-green-200 dark:border-gray-700 py-[9px] pl-12 text-sm outline-2 placeholder:text-gray-500 text-black"
          placeholder={placeholder}
          onChange={handleSearch}
        />
        <button
          className="absolute left-0 rounded-l-md top-1/2 dark:bg-white/10 border dark:border-gray-700 -translate-y-1/2 py-[9px] px-[9px]"
        >
          <FaMagnifyingGlass className="h-[18px] w-[18px] text-gray-700 dark:text-gray-300 peer-focus:text-gray-900 " />
        </button>
      </div>
    </section>
  );
};

export default Search;