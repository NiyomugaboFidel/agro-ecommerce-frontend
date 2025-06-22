import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import WishlistIcon from "./WishlistIcon";
import { useCart } from "../../../context/CartContext"; // Use the CartContext hook for cart operations
import RatingComp from "./Rating";
import i18n from "./LangConfig";
import toast from "react-hot-toast";

const FlashSaleItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(item.moq);
  useEffect(() => {}, [item]);
  const handleAddToCart = async () => {
    if (isInCart(item.id)) {
      try {
        await removeFromCart(item.id);
        console.log("Removed from cart", item.title);
        toast.success(`${item.title} removed to cart`);
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Error removing from cart:", error);
      }
    } else {
      try {
        await addToCart({ ...item, quantity });
        console.log("Added to cart", quantity);
        toast.success(`${item.title} added to cart`);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("error adding product to cart!!");
      }
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starColor = i < item.stars ? "#FFAD33" : "#D1D5DB";
      stars.push(
        <svg
          key={i}
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill={starColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="relative mx-2 w-fit">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center bg-zinc-100 dark:bg-white/10 w-[270px] h-80 md:h-60 transform transition-transform duration-300 focus:outline-none hover:-translate-y-2"
      >
        {isHovered && (
          <>
            <button
              onClick={handleAddToCart}
              className={`z-10 absolute bottom-0 left-0 right-0 bg-black text-white py-2 px-4 duration-300 hover:bg-gray-800 focus:outline-none ${
                isInCart(item.id) && "bg-secondary"
              }`}
            >
              {isInCart(item.id)
                ? i18n.t("removeFromCart")
                : i18n.t("addToCart")}
            </button>
          </>
        )}
        {item.discount && (
          <div className="absolute top-0 left-0 bg-secondary text-white py-1 px-3 m-2 rounded">
            -{item.discount}%
          </div>
        )}
        <Link to={{ pathname: `/allProducts/${item.id}` }} key={item.id}>
          <img
            loading="lazy"
            src={item.imageSrc}
            alt={item.title}
            className=" max-h-52 w-full object-contain"
          />
        </Link>
        <WishlistIcon selectedProduct={item} style="absolute top-3 right-3" />
      </div>
      <div className="flex md:items-start items-center flex-col">
        <div className="flex w-full justify-between items-center px-1">
          <h3 className="text-base font-base dark:text-gray-300 text-gray-700 mt-4">
            {item.title}
          </h3>
          <h3 className="text-base font-semibold dark:text-gray-300 text-gray-700 mt-4 flex items-center">
            CFA {item.price}/{item.unit || "Unit"}
          </h3>
        </div>
        {/* <div className="flex mt-2 text-gray-500 text-sm font-semibold gap-2 items-center w-full justify-between">
          <div className="flex items-center gap-1">{renderStars()} <span>({item.rates})</span></div>
          <RatingComp
            text={i18n.t("productPage.review")}
            variant="primary"
            item={item}
          />
        </div> */}
      </div>
    </div>
  );
};

FlashSaleItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stars: PropTypes.number,
    rates: PropTypes.number,
    discount: PropTypes.string,
    moq: PropTypes.number,
  }).isRequired,
};

export default FlashSaleItem;
