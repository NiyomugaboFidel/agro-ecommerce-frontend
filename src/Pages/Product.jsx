import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/products/products";
import ActiveLastBreadcrumb from "../components/common/components/Link";
import { useCart } from "../context/CartContext";
import i18n from "../components/common/components/LangConfig";
import { motion } from "framer-motion";
import NotFound from "./NotFound";
import { MoonLoader } from "react-spinners";

const Product = () => {
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        const productCat = productData.category.name;
        setProduct(productData);
        setQuantity(productData.moq);
        setCategory(productCat);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching the product."
        );
      }
    };

    fetchProduct();
  }, [productId]);

  console.log("product===", product);
  const isProductInCart = cartItems.some(
    (item) => item.product._id === productId
  );

  const handleDecreaseQuantity = () => {
    if (product && quantity > product.moq) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (product) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleQuantityChange = (e) => {
    const inputQuantity = Number(e.target.value);
    if (inputQuantity >= product.moq && inputQuantity <= product.quantity) {
      setQuantity(inputQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (product && quantity >= product.moq) {
      try {
        await addToCart({ ...product, quantity });
        console.log("Added to cart", quantity);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      alert(`The quantity for this product must be at least ${product.moq}`);
    }
  };

  if (error) {
    return <NotFound message={error} />;
  }

  if (!product) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="dark:hidden">
        <MoonLoader />
        </div>
        <MoonLoader color="#fff"/>
      </div>
    );
  }

  return (
    <section className="flex flex-col mx-4 md:mx-32 pt-36">
      <div className="mx-auto flex flex-col gap-10">
        <div className="bg-white/30 w-fit">
        <ActiveLastBreadcrumb
          path={`${i18n.t("allProducts.products")}/${category}/${
            product?.title
          }`}
        />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className="flex flex-row md:flex-col gap-4">
              {product.images.map((image, index) => (
                <motion.div
                  role="button"
                  key={index}
                  className="relative flex items-center justify-center bg-zinc-100 dark:bg-white/20 rounded md:pt-12 md:p-8 md:h-[138px] md:w-[170px]"
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
              className="relative flex items-center justify-center bg-zinc-100 dark:bg-white/20 w-full rounded md:pt-12 md:p-8 md:h-[600px] md:w-[500px]"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="transform transition-transform duration-300 hover:scale-105 focus:outline-none w-full max-h-full"
              />
            </motion.div>
          </div>
          <div className="flex gap-5 flex-col w-full p-3 shadow-lg border border-red-50 dark:border-gray-700">
            <div className="flex gap-4 flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-300">
                {product.title}
              </h2>
              <div className="flex text-gray-500 dark:text-gray-200 text-sm gap-2 items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {" "}
                  {i18n.t("item.discount")}
                </span>
                : ({product.discount || 0} %)
              </div>
              <p className="text-gray-700 text-xl md:text-xl font-semibold dark:text-gray-300">
                CFA {product.price}.00 / {product.unit || "Unit"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-200">{product.details}</p>
              <p className="text-sm text-gray-500 dark:text-gray-200">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {i18n.t("item.expires")}
                </span>
                : {new Date(product.expirationDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-200">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {i18n.t("item.availQuantity")}
                </span>
                : {product.quantity} {product.unit || "Units"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-200">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {i18n.t("item.MOQ")}
                </span>
                : {product.moq} {product.unit || "Units"}
              </p>
            </div>
            {!isProductInCart && (
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {i18n.t("item.quantity")} :{" "}
                <span className="font-normal">
                  {quantity} {product.unit || "Unit"}
                </span>
              </div>
            )}
            {!isProductInCart && (
              <div className="text-base font-semibold text-gray-600 dark:text-gray-300 flex gap-4">
                <button
                  className="border p-2 dark:border-gray-700"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= product.moq}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center border p-2 dark:bg-transparent dark:text-gray-300 dark:border-gray-700"
                  min={product.moq}
                  max={product.quantity}
                />
                <button
                  className="border p-2 dark:border-gray-700"
                  onClick={handleIncreaseQuantity}
                  disabled={quantity >= product.quantity}
                >
                  +
                </button>
              </div>
            )}
            {!isProductInCart && (
              <buttom
                type="submit"
                onClick={handleAddToCart}
                className="bg-secondary text-center py-2 text-white cursor-pointer hover:bg-gray-700 dark:text"
              >
                {i18n.t("item.addCart")}
              </buttom>
            )}
            {isProductInCart && (
              <div className="w-full text-center text-green-600 font-bold">
                {i18n.t("item.addedToCart")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
