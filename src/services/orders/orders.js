import customAxios from "../../lib/customAxios";


export const getAllOrders = async () => {
    try {
      const res = await customAxios.get("/orders/all");
      const data = res.data;
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };

export const getOrdersByUser=async()=>{
    try {
        const res = await customAxios.get("/orders/user");
        const data = res.data;
        return data;
      } catch (error) {
        return error.response.data.message;
      } 
}

export const updateOrderStatus=async(id,status)=>{
    try {
        const res = await customAxios.patch(`/orders/${id}`,{status});
        const data = res.data;
        return data;
      } catch (error) {
        return error.response.data.message;
      } 
}

export const updateOrderDeliveryStatus=async(id)=>{
    try {
        const res = await customAxios.patch(`/orders/${id}/delivers`);
        const data = res.data;
        return data;
      } catch (error) {
        return error.response.data.message;
      } 
}

export const getAllDeliveredOrders=async () => {
  try {
    const res = await customAxios.get("/orders/delivers");
    const data = res.data;
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const cancelOrder=async(id)=>{
  try{
    const res=await customAxios.patch(`/orders/${id}/cancel`)
    return res.data
  }
  catch(error){
    return error.response.data.message;
  }
}

export const getOrderById=async(id)=>{
  try{
    const res=await customAxios.get(`/orders/${id}`)
    return res.data
  }
  catch(error){
    return error.response.data.message;
  }
}