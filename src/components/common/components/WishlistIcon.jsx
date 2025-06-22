import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { useWishlist } from "../../../context/WishlistContext";
import toast from "react-hot-toast";

const WishlistIcon = ({ selectedProduct, style = "" }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  useEffect(() => {
    const wishlistItemExists = wishlistItems.some((wishlistItem) => {
      const productId = wishlistItem?.product?._id || wishlistItem?.product?.id;
      return productId === selectedProduct.id;
    });
    setIsInWishlist(wishlistItemExists);
  }, [wishlistItems, selectedProduct.id]);

  const handleDeleteFromWishlist = async () => {
    try {
      await removeFromWishlist(selectedProduct.id);
      setIsInWishlist(false); // Optimistically update the state
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist(selectedProduct);
      setIsInWishlist(true); // Optimistically update the state
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <div>
      {isInWishlist ? (
        <div className={`${style} bg-red-800 hover:bg-red-500 rounded-full`}>
          <IconButton onClick={handleDeleteFromWishlist} size="small">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full hover:bg-red-500 opacity-75"></span>
            <svg
              className="w-8 h-8 p-1"
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 3.57143H2.33333L3.66667 19H14.3333L15.6667 3.57143H1M9 7.42857V15.1429M12.3333 7.42857L11.6667 15.1429M5.66667 7.42857L6.33333 15.1429M6.33333 3.57143L7 1H11L11.6667 3.57143"
                stroke="white"
                strokeWidth="1.56"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </div>
      ) : (
        <div
          className={`${style} bg-white hover:bg-white rounded-full border border-gray-500/20`}
        >
          <IconButton onClick={handleAddToWishlist} size="small">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full text-gra hover:bg-green-200 opacity-75"></span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 21.394 16 26C25.125 21.394 26 14.157 26 11.95C26 9.216 23.761 7 21 7C19.237 7 17.741 7.926 16.892 9.32C16.635 9.766 16.356 10.006 16 10.006C15.644 10.006 15.365 9.766 15.108 9.32C14.259 7.926 12.763 7 11 7Z"
                stroke="#4ade80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </div>
      )}
    </div>
  );
};

WishlistIcon.propTypes = {
  selectedProduct: PropTypes.object.isRequired,
  style: PropTypes.string,
};

export default WishlistIcon;
