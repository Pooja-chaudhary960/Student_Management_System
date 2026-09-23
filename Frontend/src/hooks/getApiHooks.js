import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export const useGetApiHooks = (url) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await apiClient.get(url);

      console.log(response.data);

      setData(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);

  return [data]
};
