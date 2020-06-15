import React, { useEffect, useState, useContext } from "react";

import Map from "../components/UIElements/Map";
import "./MapSearch.css";
import { MapContext } from "../context/googleMaps-context";
import { useHttpClient } from "../hooks/http-hook";
import GoogleMapsSearch from "./UIElements/GoogleMapsSearch.js";

const MapSearch = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { locations, getLocations } = useContext(MapContext);
  const [term, setTerm] = useState("");
  const [coords, setCoords] = useState([]);
  const [searchedPlaceUrl, setSearchedPlaceUrl] = useState();
  const [searchedPlaceCoords, setSearchedPlaceCoords] = useState();
  const [coordinatesInDB, setCoordinatesInDB] = useState([]);
  const [visitorCoordsLng, setVisitorCoordsLat] = useState();
  const [visitorCoordsLat, setVisitorCoordsLng] = useState();

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
    const getVisitorCoords = async () => {
      try {
        window.navigator.geolocation.getCurrentPosition((position) => {
          setVisitorCoordsLat(position.coords.latitude);
          setVisitorCoordsLng(position.coords.longitude);
        });
      } catch (err) {}
    };
  }, [term]);
  useEffect(() => {
    const response = fetch(searchedPlaceUrl)
      .then((data) => data.json())
      .then((data) =>
        setSearchedPlaceCoords(data?.results[0]?.geometry?.location)
      );
  }, [searchedPlaceUrl]);

  useEffect(() => {
    const getCoordsInDB = () => {
      props.homes.forEach((el) =>
        setCoordinatesInDB((prevState) => [...prevState, el.location])
      );
    };
    getCoordsInDB();
  }, [props.homes]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const overView = {
    lat: visitorCoordsLat ? visitorCoordsLat : 39.84031840000001,
    lng: visitorCoordsLng ? visitorCoordsLng : -86.12785629999999,
  };

  return (
    <div className="mapsearch__container">
      <div className={`map-container ${props.main}`}>
        <Map
          center={searchedPlaceCoords ? searchedPlaceCoords : overView}
          locations={coordinatesInDB}
          zoom={searchedPlaceCoords ? 16 : 5}
        />
      </div>
      <div className="search__container">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "80px",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="search"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "500",
            }}
          >
            We have rentals all around the world. Let us find the perfect one
            for you
          </label>
          <div className="search__container">
            <input
              id="search"
              placeholder="Find our rentals nearest you..."
              type="text"
              onChange={handleChange}
            />
            <i className="fas fa-search-location"></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MapSearch;
