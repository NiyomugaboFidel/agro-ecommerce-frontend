import { useState } from "react";
import { useLang } from "../../context/LangContext.jsx";
import { IoMdArrowDropdown } from "react-icons/io";

function ChangeLang() {
  const { lang, changeLanguage } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (selectedLang) => {
    setLoading(true);
    changeLanguage(selectedLang);

    setTimeout(() => {
      window.location.reload()
      setLoading(false);
    }, 1000);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!loading) {
      setIsOpen((prev) => !prev);
    }
  };

  

  return (
    <div className="relative my-2 z-50 bg-neutral-700 rounded-full">
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 md:px-4 px-1 py-2 rounded-md text-white text-sm ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
   <p className="">
  {lang === "en" ? "EN" : lang === "fr" ? "FR" : "RW"}
</p>
<img
  src={
    lang === "en"
      ? "/images/en-flag.png"
      : lang === "fr"
      ? "/images/fr-flag.png"
      : "/images/rw-flag.png"
  }
  alt={
    lang === "en"
      ? "English"
      : lang === "fr"
      ? "Français"
      : "Rwanda"
  }
  className="w-6 h-4"
/>
        <IoMdArrowDropdown className="text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg border border-gray-200 z-10">
  <button
  onClick={() => handleLanguageChange("en")}
  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
>
  <img src="/images/en-flag.png" alt="English" className="w-5 h-3 mr-2" />
  <span>English</span>
</button>
<button
  onClick={() => handleLanguageChange("fr")}
  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
>
  <img src="/images/fr-flag.png" alt="Français" className="w-5 h-3 mr-2" />
  <span>Français</span>
</button>
<button
  onClick={() => handleLanguageChange("rw")}
  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
>
  <img src="/images/rw-flag.png" alt="Rwanda" className="w-5 h-3 mr-2" />
  <span>Rwanda</span>
</button>
        </div>
      )}

    </div>
  );
}

export default ChangeLang;
