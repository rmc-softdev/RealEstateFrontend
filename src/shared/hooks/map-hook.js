import React, { useState, useEffect } from "react";

export const useMap = () => {
  const [locations, setLocations] = useState([
    ["Bondi Beach", 40.7484405, -73.78566439999999, 4],
    ["Coogee Beach", 40.623036, -73.559052, 5],
    ["Coogee Beach", 40.323036, -73.459052, 5],
  ]);
  const getLocations = () => {};
  useEffect(() => {
    setLocations((prevState) => [...prevState, { lat: "20", lgn: "30" }]);
  }, []);

  return { locations, getLocations };
};
