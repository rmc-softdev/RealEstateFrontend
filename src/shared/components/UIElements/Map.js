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

    new window.google.maps.Marker({ position: center, map: map });
    if (locations) {
      locations.forEach((el) => {
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(el?.lat, el?.lng),
          map: map,
        });
      });
    }

    // if (locations) {
    //   locations.forEach((el, i) => {
    //     let newarr = [];
    //     let latlgn = [];
    //     el.split(",").forEach((el) => newarr.push(el.split(":")[1]));
    //     newarr.map((el) => {
    //       latlgn.push(el.replace(/}/g, "").trim());
    //     });
    //     const marker = new window.google.maps.Marker({
    //       position: new window.google.maps.LatLng(latlgn[0], latlgn[1]),
    //       map: map,
    //     });
    //   });
    // }
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
