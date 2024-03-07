import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const useHttpRequest = (transformData) => {
  const [loading, setLoading] = useState(false);

  const sendHttpRequest = async (reqOptions) => {
    setLoading(true);
    try {
      const { data } = await axios(reqOptions);
      handleResponse(data);
      transformData(data);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (data) => {
    switch (data.status) {
      case "ok":
        console.log("success");
        toast.success(data.message);
        break;
      case "fail":
        toast.error(data.message);
        break;
      default:
        toast.error(data.message);
    }
  };

  return { loading, sendHttpRequest };
};

export default useHttpRequest;
