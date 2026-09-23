import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export const usePostApiHooks = (url) => {
    
    
  const [data, setData] = useState([]);
  const postData = async (values) => {
    try {
        
      const response = await apiClient.post(url,values);

      console.log(response);
      setData(response.data)
      return response.data

     
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  useEffect(() => {
    postData();
  }, [url]);
 console.log(data)
  return {data,postData}
};
