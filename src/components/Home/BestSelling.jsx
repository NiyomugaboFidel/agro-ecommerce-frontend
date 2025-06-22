import { useState, useEffect } from "react";
import FlashSaleItem from "../common/components/FlashSaleItem";
import RedTitle from "../common/components/RedTitle";
import ViewAll from "../common/components/ViewAll";
import i18n from "../common/components/LangConfig";
import Loader from "../common/components/Loader";
import { getProducts } from "../../services/products/products";

const BestSelling = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedItems = products.sort(
    (a, b) => parseFloat(b.rates) - parseFloat(a.rates)
  );
  const bestItems = sortedItems.slice(0, 4);

  return (
    <>
      <div className="p-4 max-w-[1440px] self-center w-full relative">
        <RedTitle title={i18n.t("bestSelling.redTitle")} />

        <div className="flex justify-between items-center md:mr-6 md:mb-4">
          <h2 className="text-lg  md:text-3xl font-semibold dark:text-gray-300 ">
            {i18n.t("bestSelling.title")}
          </h2>
          <ViewAll name={i18n.t("redButtons.viewAll")} />
        </div>

        <div className="relative mt-10">
          <div className="scrollbar hover:overflow-scroll relative overflow-x-auto flex justify-start items-center h-[500px] md:h-[400px] space-x-4">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Loader key={index} />
                ))
              : bestItems.map((item, index) => (
                  <FlashSaleItem
                    key={item._id}
                    item={{
                      id: item._id,
                      imageSrc: item.images[0],
                      title: item.title,
                      price: item.price,
                      stars: item.stars || 0,
                      rates: item.rates || 0,
                      discount: item.discount || "",
                    }}
                    index={index}
                    totalItems={products.length}
                  />
                ))}
          </div>
        </div>
      </div>
      <hr className="mx-40 border-gray-300 md:mt-16" />
    </>
  );
};

export default BestSelling;
