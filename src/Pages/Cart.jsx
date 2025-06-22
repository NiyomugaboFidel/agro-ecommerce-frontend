import i18n from "../components/common/components/LangConfig";
import { useCart } from "../context/CartContext";
import CartItem from "../components/Cart/CartItem";
import WhiteButton from "../components/common/components/WhiteButton";
import RedButton from "../components/common/components/RedButton";
import ActiveLastBreadcrumb from "../components/common/components/Link";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, totalPrice, totalItems } = useCart();
  if (!Array.isArray(cartItems)) {
    return <div>Error: Cart items are not in the expected format.</div>;
  }

  return (
    <div className="md:max-w-7xl md:px-20 px-4 w-full mx-auto pt-36 flex flex-col gap-10 dark:text-gray-300">
      <div className="bg-white/30 w-fit">
      <ActiveLastBreadcrumb path="Home/Cart" />
      </div>
      <div className="flex flex-row justify-between items-center py-6 px-2 md:px-14 shadow rounded md:gap-24 gap-2 w-full ">
        <h2 className="text-base">{i18n.t("cart.header.product")}</h2>
        <h2 className="text-base ml-10">{i18n.t("cart.header.price")}</h2>
        <h2 className="text-base ">{i18n.t("cart.header.quantity")}</h2>
        <h2 className="text-base hidden md:flex">{i18n.t("cart.header.subtotal")}</h2>
      </div>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <CartItem
            key={item._id}
            item={item}
            index={index}
            stars={item.stars}
            rates={item.rates}
          />
        ))
      ) : (
        <p className="w-full text-slate-600 text-center">{i18n.t("cart.emptyCart")}</p>
      )}
      <div className="flex justify-between items-center mt-2 sm:px-0 px-4 sm:gap-0 gap-4">
        <Link to="..">
          <WhiteButton name={i18n.t("whiteButtons.returnToShop")} />
        </Link>

        <WhiteButton name={i18n.t("whiteButtons.updateCart")} />
      </div>
      <div className="flex items-center mt-4 md:flex-row gap-8 flex-col justify-between ">

        <div className="flex justify-between flex-col gap-6 border dark:border-gray-700 py-8 px-6 md:w-[470px] w-full">
          <p className="text-xl font-semibold">{i18n.t("cart.cartTotal")}</p>
          <div className="flex justify-between mt-4 border-b dark:border-gray-700">
            <p className="text-xl">{i18n.t("cart.total")}:</p>
            <p className="text-xl">CFA {(totalPrice).toLocaleString()}</p>
          </div>
          <div className="flex justify-between mt-4 border-b dark:border-gray-700">
            <p className="text-xl">{i18n.t("cart.totalItems")}:</p>
            <p className="text-xl">{totalItems}</p>
          </div>
          <div>
            <Link to="/checkout">
              <RedButton name={i18n.t("redButtons.processToCheckout")} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
