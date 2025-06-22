import RedTitle from "../common/components/RedTitle";
import i18n from "../common/components/LangConfig";
import { Link } from "react-router-dom";
import { ITEMS } from "../common/functions/items";

const Featured = () => {
  const ShopNow = () => {
    return (
      <button className=" mb-4 md:mb-0 flex gap-2 underline underline-offset-8 py-2  focus:underline-offset-2  ease-in-out  duration-300 transform hover:translate-x-4">
        <span> {i18n.t("featured.shopNow")}</span>
        <svg
          className="mt-1 "
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 12H20M20 12L13 5M20 12L13 19"
            stroke="#FAFAFA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  };
  const playstationItem = ITEMS.find(
    (item) => item.title === i18n.t("itemsArray.18.title")
  );
  const womenCollectionsItem = ITEMS.find(
    (item) => item.title === i18n.t("itemsArray.20.title")
  );
  const speakersItem = ITEMS.find(
    (item) => item.title === i18n.t("itemsArray.19.title")
  );
  const perfumesItem = ITEMS.find(
    (item) => item.title === i18n.t("itemsArray.16.title")
  );

  return (
    <div className="self-center max-w-[1440px] flex flex-col my-24">
      <div className="mx-2">
        <RedTitle title={i18n.t("featured.redTitle")} />
        <h2 className="text-2xl md:text-3xl font-semibold mb-14 dark:text-gray-300">
          {i18n.t("featured.title")}
        </h2>
      </div>
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="bg-black rounded md:pt-12 md:px-8 md:h-[600px] md:w-[570px]">
          <div className=" text-white relative flex gap-10  md:mt-10 items-center justify-center flex-col-reverse md:flex-row md:w-[511px] md:h-[511px] sm:h-[500px] h-[380px]">
            <div className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover">
              <Link to={{ pathname: `/allProducts` }} key={playstationItem.id}>
                <img
                  loading="lazy"
                  className="w-full h-full transition-transform duration-300 transform  hover:-translate-y-4  hover:scale-101 hover:motion-safe:animate-pulse opacity-100 hover:opacity-100"
                  src="/images/cofee.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="flex transform flex-col gap-1 md:gap-4 mt-auto md:mr-auto  w-[270px] md:mb-8  items-center md:items-start justify-end">
              <h2 className=" text-center md:text-start text-lg md:text-2xl font-semibold font-inter">
                {i18n.t("featured.agriculture.title")}
              </h2>
              <p className=" text-center md:text-start text-sm ">
                {i18n.t("featured.agriculture.description")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-primary rounded md:px-6  h-[284px] min-[400px]:max-sm:h-[450px] md:w-[270px]">
              <div className=" text-white relative flex md:gap-10 md:mt-10 items-center justify-center flex-col-reverse md:flex-row w-full h-full md:h-[221px] ">
                <div className="px-16 py-4 min-[400px]:px-auto sm:p-0 overflow-hidden absolute inset-0 z-0 bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105   ">
                  <Link to={{ pathname: `/allProducts` }} key={speakersItem.id}>
                    <img
                      loading="lazy"
                      className="w-full h-full max-w-[400px] transition-transform duration-300 transform  hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover hover:opacity-100"
                      src="/images/wooden.png"
                      alt={speakersItem.title}
                    />
                  </Link>
                </div>
                <div className="flex transform flex-col gap-1 md:gap-2 mt-auto md:mr-auto md:pl-4 w-[270px] items-center md:items-start md:justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent z-[-1]" />
                  <h2 className=" text-center md:text-start text-lg md:text-xl font-semibold font-inter">
                    {i18n.t("featured.handicrafts.title")}
                  </h2>
                  <p className=" text-center md:text-start text-xs ">
                    {i18n.t("featured.handicrafts.description")}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500 rounded md:px-6  h-[284px] min-[400px]:max-sm:h-[450px] md:w-[270px]">
              <div className=" text-white relative flex md:gap-10 md:mt-10 items-center justify-center flex-col-reverse md:flex-row w-full h-full md:h-[221px] ">
                <div className="px-16 py-4 min-[400px]:px-auto sm:p-0 overflow-hidden absolute inset-0 z-0 bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105   ">
                  <Link to={{ pathname: `/allProducts` }} key={speakersItem.id}>
                    <img
                      loading="lazy"
                      className="w-full h-full max-w-[400px] transition-transform duration-300 transform  hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover hover:opacity-100"
                      src="/images/banana.png"
                      alt={speakersItem.title}
                    />
                  </Link>
                </div>
                <div className="flex transform flex-col gap-1 md:gap-2 mt-auto md:mr-auto md:pl-4 w-[270px] items-center md:items-start md:justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500 to-transparent z-[-1]" />
                  <h2 className=" text-center md:text-start text-lg md:text-2xl font-semibold font-inter">
                    {i18n.t("featured.food.title")}
                  </h2>
                  <p className=" text-center md:text-start text-sm ">
                    {i18n.t("featured.food.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-red-600 rounded md:px-6  h-[284px] min-[400px]:max-sm:h-[450px] md:w-[270px]">
              <div className=" text-white relative flex md:gap-10 md:mt-10 items-center justify-center flex-col-reverse md:flex-row w-full h-full md:h-[221px] ">
                <div className="px-16 py-4 min-[400px]:px-auto sm:p-0 overflow-hidden absolute inset-0 z-0 bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105   ">
                  <Link to={{ pathname: `/allProducts` }} key={speakersItem.id}>
                    <img
                      loading="lazy"
                      className="w-full h-full max-w-[400px] transition-transform duration-300 transform  hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover hover:opacity-100"
                      src="/images/lipstick.png"
                      alt={speakersItem.title}
                    />
                  </Link>
                </div>
                <div className="flex transform flex-col gap-1 md:gap-2 mt-auto md:mr-auto md:pl-4 w-[270px] items-center md:items-start md:justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent z-[-1]" />
                  <h2 className=" text-center md:text-start text-lg md:text-2xl font-semibold font-inter">
                    {i18n.t("featured.cosmetics.title")}
                  </h2>
                  <p className=" text-center md:text-start text-sm ">
                    {i18n.t("featured.cosmetics.description")}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-500 rounded  md:px-6 h-[284px] min-[400px]:max-sm:h-[450px] md:w-[270px]">
              <div className=" text-white relative flex md:gap-10 md:mt-10 items-center justify-center flex-col-reverse md:flex-row w-full h-full md:h-[221px] ">
                <div className="px-16 py-8 min-[400px]:px-auto sm:p-0 overflow-hidden absolute inset-0 z-0 bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105  ">
                  <Link to={{ pathname: `/allProducts` }} key={perfumesItem.id}>
                    <img
                      loading="lazy"
                      className="w-full h-full max-w-[400px] transition-transform duration-300 transform  hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover hover:opacity-100"
                      src="/images/solar.png"
                      alt={perfumesItem.title}
                    />
                  </Link>
                </div>
                <div className="flex transform flex-col gap-1 md:gap-2 mt-auto md:mr-auto md:pl-4 w-[270px] items-center md:items-start md:justify-end relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500 to-transparent z-10" />

                  <h2 className="text-center md:text-start text-lg md:text-2xl font-semibold font-inter z-20">
                    {i18n.t("featured.energyAndResources.title")}
                  </h2>

                  <p className="text-center md:text-start text-sm z-20">
                    {i18n.t("featured.energyAndResources.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Featured;
