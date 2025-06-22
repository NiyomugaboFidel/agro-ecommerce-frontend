import FlashSaleItem from "../common/components/FlashSaleItem";
import { useState, useEffect } from "react";
import RedTitle from "../common/components/RedTitle";
import Arrows from "../common/components/Arrows";
import { fetchProductByCat } from "../../services/products/products";
import { MoonLoader } from "react-spinners";
import PropTypes from "prop-types";

const ProductsByCategory = ({ title, productCat }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchAgriProd = async () => {
      setIsloading(true);
      try {
        const data = await fetchProductByCat(productCat);
        setProducts(data || []); // Assuming the data has a `products` array
      } catch (error) {
        console.error("Error fetching agriculture products:", error);
      } finally {
        setIsloading(false);
      }
    };

    fetchAgriProd(); // Call the function to fetch products
  }, []);


  return (
    <div className="p-4 max-w-[1440px] self-center w-full relative">
      <RedTitle title={title} />
      <div className="flex md:justify-between items-center md:mb-4">
        <Arrows />
      </div>
      {isLoading ? (
        <div className="h-fit py-5 w-full flex flex-col justify-center items-center">
          <div className="dark:hidden">
            <MoonLoader />
          </div>
          <MoonLoader color="#fff" />
        </div>
      ) : (
        <div className="scrollbar relative md:overflow-x-hidden hover:overflow-scroll overflow-y-hidden flex justify-start items-center h-[500px] md:h-[400px]">
          {products.length > 0 ? (
            products.map((item) => (
              <FlashSaleItem
                key={item._id}
                item={{
                  id: item._id,
                  imageSrc: item.images[0],
                  title: item.title,
                  price: item.price,
                  stars: item.stars || 0,
                  rates: item.rates || 0,
                  unit: item.unit || "Unit",
                  discount: item.discount || "",
                  moq: item.moq,
                  category: item.category,
                }}
              />
            ))
          ) : (
            <p className="text-center">No products available</p> // Show a message if there are no products
          )}
        </div>
      )}

      <hr className="mx-40 border-gray-300 md:mt-16" />
    </div>
  );
};
ProductsByCategory.propTypes = {
  title: PropTypes.string.isRequired,
  productCat: PropTypes.string.isRequired,
};

export default ProductsByCategory;

