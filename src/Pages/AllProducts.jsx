import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import FlashSaleItem from "../components/common/components/FlashSaleItem";
import i18n from "../components/common/components/LangConfig";
import RedButton from "../components/common/components/RedButton";
import WhiteButton from "../components/common/components/WhiteButton";
import Loader from "../components/common/components/Loader";
import { getProducts } from "../services/products/products";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState(10);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    window.scrollTo({
      top: window.scrollY - 1500,
      behavior: "smooth",
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisplayedItems(displayedItems + 10);
    }, 2000);
  };

  return (
    <div className="pt-40 flex flex-col gap-5">
      <h1 className="text-4xl mb-10 text-center  md:text-3xl font-semibold dark:text-gray-300 ">
        {i18n.t("allProducts.title")}
      </h1>
      <div className="mx-auto">
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          {loading
            ? Array.from({ length: displayedItems }).map((_, index) => (
                <Grid item key={index}>
                  <Loader />
                </Grid>
              ))
            : products.slice(0, displayedItems).map((item) =>{
              return (
                <Grid item key={item._id}>
                  <FlashSaleItem
                    item={{
                      id: item._id,
                      imageSrc: item.images[0],
                      title: item.title,
                      price: item.price,
                      stars: item.stars || 0,
                      rates: item.rates || 0,
                      discount: item.discount || "",
                      category:item.category
                    }}
                  />
                </Grid>
              )
            } )}
        </Grid>
      </div>
      {displayedItems < products.length && (
        <button
          onClick={handleLoadMore}
          type="button"
          className="md:mx-auto text-center rounded-md px-5 py-3 mt-8 shadow hover:shadow-md active:shadow-inner transition
            hover:bg-gray-50 dark:hover:bg-white/20 border text-[#696A75] dark:text-gray-300 hover:text-[#696A75] border-[#696A75] hover:border-[#696A75]
            hover:scale-105 hover:-translate-y-2 transform  duration-300 ease-in-out"
        >
          {i18n.t("whiteButtons.loadMore")}
        </button>
      )}
      <div className="mt-6 flex justify-around items-center md:mx-12 md:px-0 px-4 md:gap-0 gap-2">
        <Link to="..">
          <WhiteButton name={i18n.t("whiteButtons.backToHomePage")} />
        </Link>
        <Link to="/category/Agriculture">
          <RedButton name={i18n.t("redButtons.exploreByCategory")} />
        </Link>
      </div>
    </div>
  );
};

export default AllProducts;
