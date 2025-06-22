import customAxios from "../../lib/customAxios";

const token = localStorage.getItem("token") || "";
export const getCart = async () => {
  try {
    const res = await customAxios.get("/carts", 
        {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
);
    return res.data
  } catch (error) {
    return error.response.data.message;
  }
};

export const removeProdFromCart=async(id)=>{
  try{
    const res=await customAxios.delete(`/carts/remove/${id}`)
    return res.data
  }catch(error){
    return error.response.data.message;
  }
}