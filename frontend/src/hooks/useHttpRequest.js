import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const useHttpRequest = (transformData) => {
  const [loading, setLoading] = useState(false);

  const sendHttpRequest = async (reqOptions) => {
    setLoading(true);
    try {
      const { data } = await axios(reqOptions);
      if (data.message) {
        toast.success(data.message);
      }
      transformData(data);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendHttpRequest };
};

export default useHttpRequest;
