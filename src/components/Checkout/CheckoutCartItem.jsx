/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CheckoutCartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div className=" flex flex-row justify-between items-center">
      <div className="flex items-center gap-6">
        <div className="flex ">
          <Link to={{ pathname: `/allProducts/${item.product.title}` }} key={item.id}>
            <img
              loading="lazy"
              src={item.product.images[0]}
              alt={item.product.title}
              className="w-14 h-14  "
            />
          </Link>
        </div>
        <div>
          <p className="text-xs md:text-base">{item.product.title}</p>
        </div>
      </div>
      <div className="flex items-center ">
        <p className="text-gray-500">
          CFA {(item.product.price).toLocaleString()}
          {quantity >= 20 ? ` x ${quantity}` : ""}
        </p>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
