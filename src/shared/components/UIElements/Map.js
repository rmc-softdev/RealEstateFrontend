import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom, notcenter } = props;

  useEffect(() => {
    //avaliable from the sdk imported inside the index.html
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });

    var locations = [
      ["Bondi Beach", 40.7484405, -73.78566439999999, 4],
      ["Coogee Beach", -33.923036, 151.259052, 5],
    ];

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          locations[i][1],
          locations[i][2]
        ),
        map: map,
      });

      // window.google.maps.event.addListener(
      //   marker,
      //   "click",
      //   (function (marker, i) {
      //     return function () {
      //       infowindow.setContent(locations[i][0]);
      //       infowindow.open(map, marker);
      //     };
      //   })(marker, i)
      // );
    }
  }, [center, zoom, notcenter]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
