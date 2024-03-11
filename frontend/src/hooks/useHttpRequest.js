import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const useHttpRequest = (transformData, showToast = true) => {
  const [loading, setLoading] = useState(false);

  const sendHttpRequest = async (reqOptions) => {
    setLoading(true);
    try {
      const { data } = await axios(reqOptions);
      handleResponse(data, showToast);
      transformData(data);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const sendRequestWithToken = async (reqOptions, showToast = true) => {
    setLoading(true);

    if (reqOptions.headers) {
      reqOptions.headers.authorization = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    } else {
      reqOptions.headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    }

    try {
      const { data } = await axios(reqOptions);
      handleResponse(data, showToast);
      transformData(data);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (data, showToast = true) => {
    if (showToast) {
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
    }
  };

  return { loading, sendHttpRequest, sendRequestWithToken };
};

export default useHttpRequest;
