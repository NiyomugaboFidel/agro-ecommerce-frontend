import i18n from "../common/components/LangConfig";
import { Link } from "react-router-dom";
import hero from "./../../assets/heroImage.png";
import { FaShoppingCart, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Row1 = () => {


  return (
    <section className="self-center flex flex-row max-w-[1440px] xs:h-screen w-full">

      {/* Left Sidebar */}
      <div className=" text-white w-72 hidden bg-primary xl:flex flex-col items-center justify-start">
        <nav className="py-6 text-sm">
          <ul>
            <li className="px-4 py-2 cursor-pointer hover:underline hover:underline-offset-8   ease-in-out  duration-300 transform hover:translate-x-2">
              <Link 
              to={`/category/Agriculture`}
              className="flex items-center gap-3"
              >
              <img src="/icons/agriculture.svg" alt="" className="w-6 h-6" />
                {i18n.t("homeSections.row1.col1.0")}
              </Link>
            </li>
            {/* <li className="px-4 py-2 cursor-pointer hover:underline hover:underline-offset-8   ease-in-out  duration-300 transform hover:translate-x-2">
              <Link to="/category/Handicrafts" className="flex items-center gap-3">
              <img src="/icons/art.svg" alt="" className="w-6 h-6" />
                {i18n.t("homeSections.row1.col1.1")}{" "}
              </Link>
            </li> */}
            <li className="px-4 py-2 cursor-pointer hover:underline hover:underline-offset-8   ease-in-out  duration-300 transform hover:translate-x-2">
              <Link to="/category/Food" className="flex items-center gap-3">
              <img src="/icons/food.svg" alt="" className="w-6 h-6" />
                {i18n.t("homeSections.row1.col1.2")}{" "}
              </Link>
            </li>
            {/* <li className="px-4 py-2 cursor-pointer hover:underline hover:underline-offset-8   ease-in-out  duration-300 transform hover:translate-x-2">
              <Link to="/category/Textiles" className="flex items-center gap-3">
              <img src="/icons/textiles.svg" alt="" className="w-6 h-6" />
                {i18n.t("homeSections.row1.col1.3")}{" "}
              </Link>
            </li>
            <li className="px-4 py-2 cursor-pointer hover:underline hover:underline-offset-8   ease-in-out  duration-300 transform hover:translate-x-2">
              <Link to="/category/Cosmetics" className="flex items-center gap-3">
              <img src="/icons/cosmetics.svg" alt="" className="w-6 h-6" />
                {i18n.t("homeSections.row1.col1.4")}{" "}
              </Link>
            </li>
            <li className="px-4 py-2 cursor-pointer hover:underline hover:underline-offset-8   ease-in-out  duration-300 transform hover:translate-x-2">
              <Link to="/category/Energy and Resources" className="flex items-center gap-3">
              <img src="/icons/energy.svg" alt="" className="w-6 h-6" />
                {i18n.t("homeSections.row1.col1.5")}{" "}
              </Link>
            </li>
            <li className="px-4 py-2 cursor-pointer hover:underline hover:underline-offset-8   ease-in-out  duration-300 transform hover:translate-x-2">
              <Link to="/category/Chemicals" className="flex items-center gap-3">
              <img src="/icons/chemicals.svg" alt="" className="w-6 h-6" />
                {i18n.t("homeSections.row1.col1.6")}{" "}
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
      {/* Vertical Line */}
      <div className="border-l border-gray-300 dark:border-gray-700 hidden xl:block"></div>

      {/* Main Content */}
      <div className="relative flex xl:my-10 xl:ml-10 xl:gap-16 items-center justify-between flex-col-reverse md:flex-row md:max-h-[420px] bg-gradient-to-b bg-yellow-500 text-white w-full p-4 md:p-0 xs:h-screen xs:justify-center">
        <div className="absolute inset-0 z-[0] overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* African-Inspired Shapes */}
            <path
              d="M0,0 L50,50 L0,100 Z"
              fill="#ffffff"
              fillOpacity="0.1"
            />
            <path
              d="M80,10 C90,30 110,30 120,10 Z"
              fill="#ffffff"
              fillOpacity="0.1"
            />
            <path
              d="M150,60 L190,20 L180,80 Z"
              fill="#ffffff"
              fillOpacity="0.1"
            />
            <path
              d="M20,150 C40,130 70,130 90,150 Z"
              fill="#ffffff"
              fillOpacity="0.1"
            />
          </svg>
        </div>
        <div className="z-[1] flex flex-col md:w-1/2 gap-5 items-center md:items-start justify-center text-center md:text-left px-4">
          <h1 className="text-3xl font-extrabold leading-snug">
            {i18n.t("homeSections.row3.header")}
          </h1>
          <p className="text-base leading-relaxed mt-2">
            {i18n.t("homeSections.row3.body")}
          </p>
          <Link to="/allProducts">
            <button className="mt-6 flex items-center gap-2 rounded-full bg-white text-yellow-400 font-semibold text-sm md:text-base py-2 px-6 transition-transform duration-300 transform hover:scale-105 shadow-lg">
              <FaShoppingCart className="text-lg" />
              {i18n.t("homeSections.row1.col2.2")}
            </button>
          </Link>
          <div className="flex gap-4 mt-4 text-white text-lg md:text-xl">
            <a href="https://wa.me/your-whatsapp-number" className="hover:text-green-300">
              <FaWhatsapp />
            </a>
            <a href="https://www.instagram.com/your-profile" className="hover:text-pink-300">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/your-profile" className="hover:text-blue-300">
              <FaFacebookF />
            </a>
            <a href="https://www.facebook.com/your-profile" className="hover:text-blue-300">
              <FaXTwitter />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end z-[1] xs:hidden">
          <img src={hero} alt="Hero" className="h-full 2xl:max-h-96 object-cover rounded-lg shadow-lg img:max-h-[450px]" />
        </div>
      </div>
    </section>
  );
};

export default Row1;
