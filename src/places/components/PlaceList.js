import React, { useEffect } from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";
import PaginationRounded from "../../shared/components/UIElements/Pagination";

const PlaceList = (props) => {
  const [startingIndex, setStartingIndex] = React.useState(0);
  const [lastIndex, setLastIndex] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  useEffect(() => {
    setStartingIndex(10 * (currentPage - 1));
  }, [currentPage]);

  useEffect(() => {
    setLastIndex(startingIndex + 10);
  }, [startingIndex]);

  // if (props.items.slice(startingIndex, lastIndex).length === 0) {
  //   return (
  //     <div className="place-list center">
  //       <Card>
  //         <h2 style={{ marginBottom: "30px" }}>
  //           Sorry, no more rentals found. If you are an agent, you might want to
  //           consider sharing one with us.
  //         </h2>
  //         <Button to="/places/new">Share Place</Button>
  //       </Card>
  //     </div>
  //   );
  // }

  const handleHowMany = (currentPage) => {
    setCurrentPage(currentPage);
  };

  return (
    <>
      <ul className="place-list">
        {props.items.slice(startingIndex, lastIndex).map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={place.onDeletePlace}
            area={place.area}
            bathrooms={place.bathrooms}
            bedrooms={place.bedrooms}
            garages={place.garages}
            type={place.type}
            status={place.status}
            price={place.price}
          />
        ))}
      </ul>
      <div className="center">
        <PaginationRounded HowManyToShow={handleHowMany} />
      </div>
    </>
  );
};

export default PlaceList;
