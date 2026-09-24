import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export const useGetApiHooks = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get(url);

      console.log(response.data);

      setData(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return [data, loading, error];
};