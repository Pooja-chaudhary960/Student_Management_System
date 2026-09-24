import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export const usePostApiHooks = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (values) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.post(url, values);

      console.log(response);
      setData(response.data);
      return response.data;
    } catch (error) {
      console.error('Data:', error.response.data.errors);
      setError(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

  return { data, postData, loading, error };
};