import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addToWishList,
  getWishes,
  removeWish,
} from "../services/wishlists/productWish";
import io from "socket.io-client";

const WishlistContext = createContext();
const socket = io("http://localhost:4000");

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: wishlistItems = [] } = useQuery(
    ["wishlistItems"],
    getWishes,
    {
      staleTime: 5 * 60 * 1000,
      onError: (error) => {
        console.error("Error fetching wishlist items:", error);
      },
    }
  );

  const addToWishlistMutation = useMutation(addToWishList, {
    onMutate: async (product) => {
      await queryClient.cancelQueries(["wishlistItems"]);
      const previousWishlist = queryClient.getQueryData(["wishlistItems"]);
      queryClient.setQueryData(["wishlistItems"], (old) => [
        ...(old || []),
        { product },
      ]);
      return { previousWishlist };
    },
    onError: (error, productId, context) => {
      console.error("Error adding to wishlist:", error);
      queryClient.setQueryData(["wishlistItems"], context.previousWishlist);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["wishlistItems"]);
    },
  });

  const handleAddToWishlist = (product) => {
    if (!product || !product.id) {
      console.error("Invalid product object:", product);
      return;
    }
    if (isInWishlist(product.id)) {
      console.warn("Product is already in the wishlist");
      return;
    }
    addToWishlistMutation.mutate(product);
  };

  const removeFromWishlistMutation = useMutation(removeWish, {
    onMutate: async (itemId) => {
      await queryClient.cancelQueries(["wishlistItems"]); // Stop any ongoing refetch.
  
      const previousWishlist = queryClient.getQueryData(["wishlistItems"]); // Get current wishlist.
  
      // Optimistically remove the item from the cache.
      queryClient.setQueryData(["wishlistItems"], (old) =>
        old?.filter((item) => item.product._id !== itemId)
      );
  
      return { previousWishlist }; // Return previous state for rollback in case of error.
    },
    onError: (error, itemId, context) => {
      console.error("Error removing from wishlist:", error);
  
      // Rollback to the previous state if mutation fails.
      queryClient.setQueryData(["wishlistItems"], context.previousWishlist);
    },
    onSettled: () => {
      // Refetch from server to ensure synchronization.
      queryClient.invalidateQueries(["wishlistItems"]);
    },
  });
  
  

  const removeFromWishlist = (itemId) => {
    const wishlistCache = queryClient.getQueryData(["wishlistItems"]);
  
    const isItemInLocalWishlist = wishlistCache?.some(
      (item) => item.product._id || item.product.id=== itemId
    );
    console.log("local wishlist===",wishlistCache)
    console.log("Is item in wishlist?", isItemInLocalWishlist);
  
    if (!isItemInLocalWishlist) {
      console.warn("Item not found in local wishlist:", itemId);
      return;
    }
  
    // Proceed with the optimistic mutation.
    removeFromWishlistMutation.mutate(itemId);
  };
  

  // Check if product is in Wishlist
  const isInWishlist = (itemId) =>
    wishlistItems.some((item) => item.product._id === itemId);

  // Real-time Updates
  socket.on("wishlistUpdated", (data) => {
    console.log("Real-time wishlist update received:", data);
    queryClient.invalidateQueries(["wishlistItems"]);
  });

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist: handleAddToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
