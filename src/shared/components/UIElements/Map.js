import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom, locations } = props;

  useEffect(() => {
    //avaliable from the sdk imported inside the index.html
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    !locations && new window.google.maps.Marker({ position: center, map: map });

    if (locations) {
      locations.forEach((el, i) => {
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(
            locations[i][1],
            locations[i][2]
          ),
          map: map,
        });
      });
    }
  }, [center, zoom, locations]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
