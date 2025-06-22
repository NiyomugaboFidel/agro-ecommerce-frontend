import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { RemoveIcon } from "../common/components/ui/iconsComponents/RemoveIcon";



const CartItem = ({ item }) => {
  const { removeFromCart, handleIncrease, handleDecrease } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleRemove = () => {
    removeFromCart(item.product._id);
  };

  const handleDecreaseFunc = () => {
    handleDecrease(item.product);
  };

  const handleIncreaseFunc = () => {
    handleIncrease(item.product);
  };

  return (
    <div className="flex flex-row justify-between items-center py-2 md:py-6 px-2 md:pr-12 md:pl-4 shadow dark:shadow-gray-100/10 rounded gap-4 md:gap-16">
      <div className="flex items-center md:gap-4">
        <div className="relative flex w-28">
          <IconButton onClick={handleRemove} className="absolute -top-4">
            <RemoveIcon />
          </IconButton>
          <Link to={`/allProducts/${item.product.title}`} key={item._id}>
            <img
              loading="lazy"
              src={item.product.images[0]}
              alt={item.product.title}
              className="w-16 h-16"
            />
          </Link>
        </div>
        <p className="hidden lg:flex text-xs md:text-base">
          {item.product.title}
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-500 dark:text-gray-300">CFA {(item.product.price).toLocaleString()}</p>
      </div>
      <div className="flex items-center border-2 border-gray-300 dark:border-gray-700 rounded px-2 py-1 mr-2 gap-3">
        <button
          className="px-1 rounded-full hover:bg-gray-200 text-gray-400"
          onClick={handleIncreaseFunc}
        >
          +
        </button>
        <p className="text-gray-500 dark:text-gray-300">{quantity}</p>
        <button
          className="px-1 rounded-full hover:bg-gray-200 text-gray-400"
          onClick={handleDecreaseFunc}
        >
          -
        </button>
      </div>
      <div className="items-center hidden md:flex">
        <p className="text-gray-500 dark:text-gray-300">CFA {(item.product.price * quantity).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CartItem;
