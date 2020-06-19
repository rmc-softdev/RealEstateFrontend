import React from "react";
import RangeSlider from "../../shared/components/UIElements/Slider";
import NumberSelect from "../../shared/components/UIElements/NumberSelect";
import SearchFieldFilter from "../../shared/components/UIElements/SearchFieldFilter";

import "./PlacesFilters.css";

const PlacesFilters = ({
  homes,
  setHomes,
  filteredHomes,
  setFilteredHomes,
}) => {
  return (
    <>
      <p
        style={{
          fontWeight: 500,
          textAlign: "center",
          marginBottom: "50px",
          fontSize: "18px",
          position: "relative",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 2 }}
      >
        Please note that this project is not fully fledged. For now, you may
        only view our rentals in the database as well as browse one near you.
        <p style={{ fontSize: "14px" }}>
          Also, since the DB isn't production ready just yet, it may take longer
          than usual so that changes can propagate towards the server.
        </p>
      </p>
      <div className="filter__container">
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "500",
            fontSize: "30px",
          }}
        >
          {" "}
          Choose the right home for you
        </div>
        <div className="filters__left">
          <RangeSlider
            label="Area (m²)"
            homes={homes}
            setHomes={setHomes}
            filteredHomes={filteredHomes}
            setFilteredHomes={setFilteredHomes}
          />
          <RangeSlider
            label="Price ($)"
            homes={homes}
            filteredHomes={filteredHomes}
            setFilteredHomes={setFilteredHomes}
          />
        </div>
        <div className="filters__right">
          <NumberSelect
            label="Bathrooms"
            homes={homes}
            setHomes={setHomes}
            filteredHomes={filteredHomes}
            setFilteredHomes={setFilteredHomes}
          />
          <NumberSelect
            label="Bedrooms"
            homes={homes}
            setHomes={setHomes}
            filteredHomes={filteredHomes}
            setFilteredHomes={setFilteredHomes}
          />
          <NumberSelect
            label="Garages"
            homes={homes}
            setHomes={setHomes}
            filteredHomes={filteredHomes}
            setFilteredHomes={setFilteredHomes}
          />
          <SearchFieldFilter
            label="Property Status"
            homes={homes}
            filteredHomes={filteredHomes}
            setFilteredHomes={setFilteredHomes}
          />
        </div>
      </div>
    </>
  );
};

export default PlacesFilters;
