import { useState, useEffect } from "react";

import { useHttpClient } from "../hooks/http-hook";

export const useHomes = () => {
  const [homes, setHomes] = useState();
  const [filteredHomes, setFilteredHomes] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAllHomes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/homes`
        );
        setHomes(responseData.homes);
      } catch (err) {}
    };
    fetchAllHomes();
  }, [sendRequest]);
  return {
    homes,
    isLoading,
    error,
    sendRequest,
    clearError,
    setHomes,
    filteredHomes,
    setFilteredHomes,
  };
};
