"use client";
import axios, { AxiosRequestHeaders, Method } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UseAxiosProps {
  run: boolean;
  method?: Method;
  url?: string;
  data?: unknown;
  headers?: {
    Authorization: string;
  };
  toastSuccess?: string;
  toastLoading?: string;
}

const useAxios = (initialConfig: UseAxiosProps) => {
  const [axiosConfig, setAxiosConfig] = useState<UseAxiosProps>(initialConfig);
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (axiosConfig.run) {
      const fetchData = async () => {
        let loadToast;
        if (axiosConfig.toastLoading) toast.loading(axiosConfig.toastLoading);
        setLoading(true);
        try {
          const response = await axios.request({
            method: axiosConfig.method,
            url: axiosConfig.url,
            data: axiosConfig.data,
            headers: axiosConfig.headers,
          });

          if (axiosConfig.toastLoading) toast.dismiss(loadToast);
          setResponseData(response.data);
    
          if (axiosConfig.toastLoading) toast.success(axiosConfig.toastSuccess);
          setErrorMessage("");
        } catch (err: any) {
          toast.dismiss(loadToast);
          if (axiosConfig.toastLoading) {
            toast.error(
              err?.response?.data?.message || "Something went wrong!"
            );
          }
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [axiosConfig]);

  return {
    responseData,
    errorMessage,
    loading,
    axiosConfig,
    setAxios: setAxiosConfig,
  };
};

export default useAxios;
