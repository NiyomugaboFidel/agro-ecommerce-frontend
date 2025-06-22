// TopHeader.jsx
import ChangeLang from "./ChangeLang";
import i18n from "../common/components/LangConfig";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../Header/ThemeSwitcher";

const TopHeader = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-primary z-40 px-2 md:px-4">
      <div className="bg-primary flex justify-between items-center lg:pl-12 lg:pr-8">
        <div className="text-white md:flex justify-start gap-2 items-center flex-1 hidden">
          <h1 className="text-[11px] md:max-w-full md:text-sm">
            {i18n.t("topHeader")}
          </h1>
          <Link to="/allProducts">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm md:text-base font-semibold underline whitespace-nowrap"
            >
              {i18n.t("shop")}
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-center xs: xs:w-full xs:justify-end gap-1">
        <ChangeLang /> 
        <ThemeSwitcher/>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
