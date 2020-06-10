import React, { useEffect, useState, useContext } from "react";

import Map from "../components/UIElements/Map";
import "./MapSearch.css";
import { MapContext } from "../context/googleMaps-context";
import { useHttpClient } from "../hooks/http-hook";

const MapSearch = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { locations, getLocations } = useContext(MapContext);
  const [term, setTerm] = useState("");
  const [coords, setCoords] = useState([]);
  const [searchedPlaceUrl, setSearchedPlaceUrl] = useState();
  const [searchedPlaceCoords, setSearchedPlaceCoords] = useState();

  useEffect(() => {
    const getCoordsForAddress = async (term) => {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=$${term}
      &key=${"AIzaSyAud-EQHWYBuy-53l0P01mu-fVLE-w6l9g"}
    `);
      if (!response) {
      } else {
        setSearchedPlaceUrl(response.url);
      }
    };
    getCoordsForAddress(term);
  }, [term]);

  useEffect(() => {
    const response = fetch(searchedPlaceUrl)
      .then((data) => data.json())
      .then((data) =>
        setSearchedPlaceCoords(data?.results[0]?.geometry?.location)
      );
  }, [searchedPlaceUrl]);

  // get all coordinates from context store
  // and pass them as props to the Map

  //this coordinate should be the user's location, see Stephen for reference

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/agent/5ed55aad8c47ad1b2006d94a`
        );
        setCoords(response.user.locations);
      } catch (err) {}
    };

    fetchUser();
  }, [searchedPlaceUrl]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className="mapsearch__container">
      <div className="map-container">
        <Map center={searchedPlaceCoords} locations={coords} zoom={16} />
      </div>
      <div className="search__container">
        <form>
          <label htmlFor="search">Search a beatiful home</label>
          <input id="search" type="text" onChange={handleChange} />
        </form>
      </div>
    </div>
  );
};

export default MapSearch;
