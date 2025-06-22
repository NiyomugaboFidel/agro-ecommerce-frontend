import customAxios from "../../lib/customAxios";

export const getProducts = async () => {
  try {
    const res = await customAxios.get("/products");
    const data = res.data;
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getProduct = async (id) => {
  try {
    const res = await customAxios.get(`/products/${id}`);

    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const fetchProductByCat = async (catName) => {
  try {
    const res=await customAxios.get(`/products/category/${catName}`)
    return res.data
  } catch (error) {
    return error.response.data.message;
  }
};

export const fetchCategory = async (id) => {
  try {
    const res = await customAxios.get(`/categories/${id}`);
    console.log("response==", res);
    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getAllCategories=async () => {
  try {
    const res = await customAxios.get(`/categories`);
    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
};