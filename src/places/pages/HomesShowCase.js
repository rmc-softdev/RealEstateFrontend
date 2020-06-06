import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import PlaceList from "../../places/components/PlaceList";
import MapSearch from "../../shared/components/MapSearch";

import "./HomesShowCase.css";

const HomesShowCase = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const [homes, setHomes] = useState();
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

  return (
    <>
      <MapSearch homes={homes} />
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && homes && <PlaceList items={homes} />}
    </>
  );
};

export default HomesShowCase;
