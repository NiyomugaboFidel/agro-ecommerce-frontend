import React, { useEffect, useState } from "react";

const ScrollButton = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 20V4M5 11L12 4L19 11"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ScrollToTop() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      {showScrollButton && (
        <div className="fixed bottom-5 md:bottom-10 right-[42%] md:right-20 z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-700 dark:bg-yellow-400 opacity-20"></span>
          <button
            onClick={scrollToTop}
            className="relative inline-flex items-center justify-center p-3 rounded-full bg-gray-700 dark:bg-yellow-500 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <ScrollButton />
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default ScrollToTop;
