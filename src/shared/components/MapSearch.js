import React, { useContext } from "react";

import Map from "../components/UIElements/Map";
import "./MapSearch.css";

const MapSearch = () => {
  // get all coordinates from context store
  // and pass them as props to the Map

  //this coordinate should be the user's location, see Stephen for reference
  const coordinates = {
    lat: 40.7484405,
    lng: -73.98566439999999,
  };

  const locations = [
    ["Bondi Beach", 40.7484405, -73.78566439999999, 4],
    ["Coogee Beach", 40.623036, -73.559052, 5],
  ];

  return (
    <div className="mapsearch__container">
      <div className="map-container">
        <Map center={coordinates} locations={locations} zoom={10} />
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
