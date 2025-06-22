import customAxios from "../../lib/customAxios";

export const getStatistics = async () => {
    try {
      const res = await customAxios.get("/statistics");
      const data = res.data;
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };