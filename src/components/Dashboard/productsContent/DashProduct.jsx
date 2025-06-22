import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../../services/products/products";
import ActiveLastBreadcrumb from "../../common/components/Link";
import { Button } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import i18n from "../../common/components/LangConfig";
import { motion } from "framer-motion";
import NotFound from "../../../Pages/NotFound";

const DashProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        const productCat = productData.category.name;
        setProduct(productData);
        setQuantity(productData.moq);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching the product."
        );
      }
    };

    fetchProduct();
  }, [productId]);

  console.log("product===", product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col mx-4 md:mx-4 mt-3 pb-10">
      <div className="mx-auto flex flex-col gap-10">
        <div className="w-full flex justify-between items-center">
      <button className="bg-red-900 self-end py-2 text-white px-3"><Link to="/dashboard/products"> Back to Products</Link></button>
      <button className="bg-yellow-600 self-end py-2 text-white px-3"><Link to={`/dashboard/products/${productId}/edit`}> Edit Product</Link></button>
      </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className="flex flex-row md:flex-col gap-4">
              {product.images.map((image, index) => (
                <motion.div
                  role="button"
                  key={index}
                  className="relative flex items-center justify-center bg-zinc-100 rounded md:pt-12 md:p-8 md:h-[138px] md:w-[170px]"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <img
                    src={image}
                    alt={product.title}
                    className="transform transition-transform duration-300 hover:scale-105 focus:outline-none w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
            <motion.div
              role="button"
              className="relative flex items-center justify-center bg-zinc-100 w-full rounded md:pt-8 md:p-6 md:h-[450px] md:w-[400px]" // Reduced size
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="transform transition-transform duration-300 hover:scale-105 focus:outline-none w-full max-h-full"
              />
            </motion.div>
          </div>
          <div className="flex gap-5 flex-col">
            <div className="flex gap-4 flex-col">
              <h2 className="text-xl md:text-2xl font-bold dark:text-gray-100">{product.title}</h2>
              <div className="flex text-gray-500 dark:text-gray-300  text-sm gap-2 items-center">
                <span>({product.rates} Reviews)</span>
              </div>
              <p className="text-gray-800 dark:text-gray-400 text-xl md:text-2xl font-inter">
                CFA {product.price}.00
              </p>
              <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">
                {product.details}
              </p>
              <p className="text-sm md:text-base dark:text-gray-400 text-gray-500">
                Category: {product.category.name}
              </p>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Quantity: {product.quantity}
              </p>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Minimum Order Quantity (MOQ): {product.moq}
              </p>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Expiration Date:{" "}
                {new Date(product.expirationDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashProduct;
