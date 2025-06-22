const Arrows = () => {
  return (
    <div className="hidden md:flex absolute  right-8  gap-2 ">
      <button className="bg-white dark:bg-white/20 rounded-full shadow-lg p-2 hover:bg-gray-200 focus:outline-none">
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-gray-700 dark:stroke-gray-300"
            d="M8 1L1 8L8 15M1 8H17"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button className="bg-white dark:bg-white/20 rounded-full shadow-lg p-2 hover:bg-gray-700 focus:outline-none">
        <svg
          width="19"
          height="16"
          viewBox="0 0 19 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-gray-700 dark:stroke-gray-300"
            d="M1.5 8H18M18 8L11 1M18 8L11 15"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
export default Arrows;
