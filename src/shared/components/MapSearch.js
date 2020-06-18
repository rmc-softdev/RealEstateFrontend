import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Map from "../components/UIElements/Map";
import "./MapSearch.css";

const MapSearch = (props) => {
  const [term, setTerm] = useState("");
  const [searchedPlaceUrl, setSearchedPlaceUrl] = useState();
  const [searchedPlaceCoords, setSearchedPlaceCoords] = useState();
  const [coordinatesInDB, setCoordinatesInDB] = useState([]);
  const [visitorCoordsLng, setVisitorCoordsLat] = useState();
  const [visitorCoordsLat, setVisitorCoordsLng] = useState();

  useEffect(() => {
    setTimeout(() => {
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
    }, 2000);

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
    lat: visitorCoordsLat ? visitorCoordsLat : 39.84031840000001,
    lng: visitorCoordsLng ? visitorCoordsLng : -86.12785629999999,
  };

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
            />
            <i className="fas fa-search-location"></i>
          </div>
        </form>
      </div>
      {/* <p
        style={{
          fontWeight: 500,
          textAlign: "center",
          marginBottom: "50px",
          fontSize: "22px",
          position: "relative",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 2 }}
      >
        Please note that this project is not fully fledged. For now, you may
        only view our rentals in the database as well as browse one near you.
        <p style={{ fontSize: "16px" }}>
          Since adding other features only amounts to more of the same
          (codewise) and this was already very intriguing to do, I chose to
          leave it as it is.
        </p>
      </p> */}
      <div className={`map-container ${props.main}`}>
        <Map
          center={searchedPlaceCoords ? searchedPlaceCoords : overView}
          locations={coordinatesInDB}
          zoom={searchedPlaceCoords ? 16 : 5}
        />
      </div>
    </motion.div>
  );
};

export default MapSearch;
