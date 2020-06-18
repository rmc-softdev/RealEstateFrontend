import React, { useState, useEffect, useContext } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { HomesContext } from "../../shared/context/homes-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import PlacesFilters from "../components/PlacesFilters";
import PlaceList from "../../places/components/PlaceList";
import MapSearch from "../../shared/components/MapSearch";

import "./HomesShowCase.css";

const HomesShowCase = () => {
  const placesContext = useContext(HomesContext);

  return (
    <>
      {placesContext.homes && (
        <MapSearch homes={placesContext.homes} main={"main"} />
      )}
      <ErrorModal
        error={placesContext.error}
        onClear={placesContext.clearError}
      />
      {placesContext.isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <PlacesFilters
        homes={placesContext.homes}
        setHomes={placesContext.setHomes}
        filteredHomes={placesContext.filteredHomes}
        setFilteredHomes={placesContext.setFilteredHomes}
      />
      {!placesContext.isLoading && placesContext.homes && (
        <PlaceList items={placesContext.filteredHomes || placesContext.homes} />
      )}
    </>
  );
};

export default HomesShowCase;
