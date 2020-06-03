import React from "react";

import Map from "../components/UIElements/Map";
import "./MapSearch.css";

const MapSearch = () => {
  const coordinates = {
    lat: 40.7484405,
    lng: -73.98566439999999,
  };
  const coord = {
    lat: 41.2484405,
    lng: -72.9439999,
  };

  return (
    <div className="mapsearch__container">
      <div className="map-container">
        <Map center={coordinates} markers={coord} zoom={10} />
      </div>
      <div className="search__container">
        <form>
          <label htmlFor="search">Search a beatiful home</label>
          <input id="search" />
        </form>
      </div>
    </div>
  );
};

export default MapSearch;
