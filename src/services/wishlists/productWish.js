import customAxios from "../../lib/customAxios";

const token = localStorage.getItem("token") || "";

export const addToWishList = async (product) => {
  const { id } = product;
  try {
    const res = await customAxios.post(`product-wishes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const removeWish = async (id) => {
  try {
    const res = await customAxios.delete(`/product-wishes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getWishes = async () => {
  if (!token) {
    console.warn("No token found in localStorage");
    return;
  }
  try {
    const res = await customAxios.get(`/product-wishes/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.wishlist;
  } catch (error) {
    return error.response.data.message;
  }
};

export const moveWishesToCart = async () => {
  try {
    const res = await customAxios.post(`/product-wishes/move-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
};
