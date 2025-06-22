import { useState, useEffect } from "react";
import { Grid, Snackbar, Alert } from "@mui/material";
import FlashSaleItem from "../components/common/components/FlashSaleItem";
import RedTitle from "../components/common/components/RedTitle";
import WhiteButton from "../components/common/components/WhiteButton";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getProducts } from "../services/products/products";
import { motion } from "framer-motion";
import i18n from "../components/common/components/LangConfig";
import { MoonLoader } from "react-spinners";

function Wishlist() {
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { moveAllToCart } = useCart();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getProducts();
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleMoveToCart = async () => {
    if (wishlistItems.length === 0) {
      setSnackbarMessage(i18n.t("Snackbar.noItems"));
      setSnackbarSeverity("info");
    } else {
      const success = await moveAllToCart();
      setSnackbarMessage(
        success ? i18n.t("Snackbar.moveSuccess") : i18n.t("Snackbar.moveFail")
      );
      setSnackbarSeverity(success ? "success" : "error");
    }
    setSnackbarOpen(true);
  };

  // Filter related items
  const getRelatedItems = () => {
    const wishlistCategories = new Set(
      wishlistItems.map((item) => item.product.category)
    );

    let relatedItems = items.filter(
      (item) =>
        wishlistCategories.has(item.category) &&
        !wishlistItems.some((wish) => {
          const productId = wish.product._id || wish.product.id;
          return productId === item._id;
        })
    );

    if (!relatedItems.length) {
      relatedItems = items.filter((item) => item.price > 1000).slice(0, 5);
    }

    return relatedItems;
  };

  if (loading)
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="dark:hidden">
          <MoonLoader />
        </div>
        <MoonLoader color="#fff" />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col md:mx-20 pt-36 dark:text-gray-300">
      {/* Wishlist Header */}
      <div className="mx-auto md:mx-2 my-20 w-full">
        <div className="flex justify-around md:justify-between md:items-center w-full mb-12">
          <h2>
            {i18n.t("wishlist.title")} ({wishlistItems.length})
          </h2>
          <WhiteButton
            name={i18n.t("whiteButtons.moveAllToBag")}
            onClick={handleMoveToCart}
            disabled={wishlistItems.length === 0 || snackbarOpen}
          />
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <p className="w-full h-[30vh] bg-gray-100 dark:bg-gray-100/10 flex justify-center items-center dark:text-gray-300 text-gray-500">
            {i18n.t("wishlist.noWishes")}
          </p>
        ) : (
          <Grid container spacing={3}>
            {wishlistItems.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={item.product._id}>
                  <FlashSaleItem
                    key={item.product._id || item.product.id}
                    item={{
                      id: item.product._id || item.product.id,
                      imageSrc:
                        item.product.images?.[0] || item.product?.imageSrc,
                      title: item.product.title,
                      price: item.product.price,
                      stars: item.product.stars || 0,
                      rates: item.product.rates || 0,
                      discount: item.product.discount || "",
                      moq: item.product.moq || 1,
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>

      {/* Related Items Section */}
      {wishlistItems.length > 0 && (
        <>
          <div className="flex justify-between items-center md:mr-6 mx-4 md:mx-0 mt-12">
            <RedTitle title={i18n.t("related")} />
          </div>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {getRelatedItems().map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <FlashSaleItem
                    item={{
                      id: item._id,
                      imageSrc: item.images?.[0] || "default-image-url",
                      title: item.title,
                      price: item.price,
                      stars: item.stars || 0,
                      rates: item.rates || 0,
                      discount: item.discount || "",
                      moq: item.moq || 1,
                    }}
                  />
                </Grid>
              </motion.div>
            ))}
          </Grid>
        </>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Wishlist;
