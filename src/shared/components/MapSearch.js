import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import Map from "../components/UIElements/Map";
import "./MapSearch.css";

const MapSearch = (props) => {
  const [term, setTerm] = useState("");
  const [searchedPlaceUrl, setSearchedPlaceUrl] = useState();
  const [searchedPlaceCoords, setSearchedPlaceCoords] = useState();
  const [coordinatesInDB, setCoordinatesInDB] = useState([]);
  //Later updates
  // const [visitorCoordsLng, setVisitorCoordsLat] = useState();
  // const [visitorCoordsLat, setVisitorCoordsLng] = useState();

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

    // const getVisitorCoords = async () => {
    //   try {
    //     window.navigator.geolocation.getCurrentPosition((position) => {
    //       setVisitorCoordsLat(position.coords.latitude);
    //       setVisitorCoordsLng(position.coords.longitude);
    //     });
    //   } catch (err) {}
    // };
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
    lat: 39.84031840000001,
    lng: -86.12785629999999,
  };

  const showMap = useCallback(() => {
    return (
      <div className={`map-container ${props.main}`}>
        <Map
          center={searchedPlaceCoords ? searchedPlaceCoords : overView}
          locations={coordinatesInDB}
          zoom={searchedPlaceCoords ? 16 : 5}
        />
      </div>
    );
  }, [term, props]);

  return (
    <motion.div className="mapsearch__container">
      <div className="search__container">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <label
            htmlFor="search"
            style={{
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "500",
            }}
          >
            We have rentals all around the USA. Search one near you
          </label>
          <div className="search__container">
            <input
              id="search"
              placeholder="Find our rentals nearest you..."
              type="text"
              onChange={handleChange}
              value={term}
            />
            <i className="fas fa-search-location"></i>
          </div>
        </form>
      </div>

      {showMap()}
    </motion.div>
  );
};

export default MapSearch;
