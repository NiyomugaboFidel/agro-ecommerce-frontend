import i18n from "../common/components/LangConfig";
import { Link } from "react-router-dom";
import { ITEMS } from "../common/functions/items";

const Deal = () => {

  const dealItem = ITEMS.find(
    (item) => item.title === i18n.t("itemsArray.15.title")
  );

  return (
    <div className=" flex gap-10 md:my-10 mt-10 items-center justify-center flex-col-reverse md:flex-row  min-h-[500px] bg-primary text-white">
      <div className="flex flex-col gap-5 items-center md:items-start  md:mx-12">
        <h3 className="text-green text-sm">{i18n.t("deal.greenTitle")}</h3>
        <h2 className="xl:w-[500px] text-center md:text-start text-2xl sm:text-3xl lg:text-5xl font-semibold font-inter">
          {i18n.t("deal.title")}
        </h2>
        <Link
          to={{ pathname: `/allProducts` }}
          key={dealItem.id}
        >
          <button className="bg-green-700   mb-8 py-4 px-12 rounded  ease-in-out  duration-300 transform hover:scale-105 hover:-translate-y-1">
            <span> {i18n.t("deal.buyNow")}</span>
          </button>
        </Link>
      </div>
      <div className="mt-4 b">
        <Link
          to={{ pathname: `/allProducts` }}
          key={dealItem.id}
        >
          <img
            src={dealItem.imageSrc}
            alt={dealItem.title}
            loading="lazy"
            className="transition-transform duration-300 transform hover:-translate-y-4 hover:scale-110 hover:motion-safe:animate-pulse"
          />
        </Link>
      </div>
    </div>
  );
};

export default Deal;
