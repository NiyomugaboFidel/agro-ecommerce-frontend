import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import customAxios from "../lib/customAxios";
import { getCart, removeProdFromCart } from "../services/carts/cart";
import { moveWishesToCart } from "../services/wishlists/productWish";
import io from "socket.io-client";
import toast from "react-hot-toast";

const CartContext = createContext();
const socket = io("http://localhost:4000");

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [quantityChanges, setQuantityChanges] = useState({});

    const fetchCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found in localStorage");
          return;
        }
        try {
            const cartData = await getCart();
            if (cartData && cartData.cart && Array.isArray(cartData.cart.products)) {
                setCartItems(cartData.cart.products);
                setTotalPrice(cartData.cart.totalPrice || 0);
                setTotalItems(cartData.cart.totalItems || 0);
            } else {
                setCartItems([]);
                setTotalPrice(0);
                setTotalItems(0);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error.message);
            setCartItems([]);
            setTotalPrice(0);
            setTotalItems(0);
        }
    };

    useEffect(() => {
        fetchCart();
        socket.on("cartUpdated", (data) => {
          if (data.action === "added") {
            setCartItems(data.cart.products);
          }
        });
      
        return () => {
          socket.off("cartUpdated");
        };
    }, []);

    useEffect(() => {
        const syncQuantities = async () => {
            if (Object.keys(quantityChanges).length === 0) return;
            
            const requests = Object.keys(quantityChanges).map((productId) =>
                customAxios.post(`/carts/${productId}/add`, { quantity: quantityChanges[productId] })
            );

            try {
                await Promise.all(requests);
                setQuantityChanges({});
                await fetchCart();
            } catch (error) {
                console.error("Error syncing quantity changes:", error.message);
            }
        };

        const intervalId = setInterval(syncQuantities, 2000);

        return () => clearInterval(intervalId);
    }, [quantityChanges]);

    const handleAddToCart = async (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.product._id === item._id || cartItem.product._id === item.id);
        const newQuantity = existingItem ? existingItem.quantity + item.quantity : item.quantity;

        if (newQuantity < item.moq) {
            console.error("Quantity is below minimum order quantity");
            return;
        }

        try {
            await customAxios.post(`/carts/${item._id || item.id}/add`, { quantity: newQuantity });
            await fetchCart();
        } catch (error) {
            console.error("Error adding to cart:", error.message);
        }
    };

    const handleIncrease = (item) => {
        setCartItems((prevItems) =>
            prevItems.map((cartItem) =>
                cartItem.product._id === item._id || cartItem.product._id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )
        );

        setQuantityChanges((prevChanges) => ({
            ...prevChanges,
            [item._id || item.id]: (prevChanges[item._id || item.id] || 0) + 1,
        }));
    };

    const handleDecrease = (item) => {
        setCartItems((prevItems) =>
            prevItems.map((cartItem) =>
                cartItem.product._id === item._id || cartItem.product._id === item.id
                    ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
                    : cartItem
            )
        );

        setQuantityChanges((prevChanges) => ({
            ...prevChanges,
            [item._id || item.id]: (prevChanges[item._id || item.id] || 0) - 1,
        }));
    };

    const removeFromCart = async (id) => {
        try {
            const result = await removeProdFromCart(id);
            if (result && result.message === "Product removed from cart successfully") {
                await fetchCart();
            } else {
                console.error("Error removing from cart:", result.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error removing from cart:", error.message);
        }
    };

    const moveAllToCart = async () => {
        try {
            const result = await moveWishesToCart();
            if (result && result.message === "All products moved from wishlist to cart") {
                await fetchCart();
                toast.success("All wishlist items moved to cart!");
                return true;
            } else {
                console.error("Error moving wishes to cart:", result);
                toast.error("Failed to move wishlist items to cart.");
                return false;
            }
        } catch (error) {
            console.error("Error moving wishes to cart:", error.message);
            toast.error("Failed to move wishlist items to cart.");
            return false;
        }
    };

    const isInCart = (itemId) => cartItems.some(item => item.product._id === itemId);

    return (
        <CartContext.Provider value={{
            fetchCart,
            totalPrice,
            totalItems,
            cartItems,
            handleIncrease,
            handleDecrease,
            addToCart: handleAddToCart,
            removeFromCart,
            isInCart,
            moveAllToCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
