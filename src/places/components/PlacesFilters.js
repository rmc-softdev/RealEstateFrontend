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
          <SearchFieldFilter
            label="Property Status"
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
        </div>
      </div>
    </>
  );
};

export default PlacesFilters;
