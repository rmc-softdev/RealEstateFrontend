import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  console.log(props);
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <p
        style={{
          marginTop: "140px",
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "500",
        }}
      >
        {" "}
        Schedule a visit with one of our top realtors{" "}
      </p>
      <ul className="users-list">
        {props.items.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
            contactemail={user.contactemail}
            fax={user.fax}
            location={user.location}
            office={user.office}
            mobile={user.mobile}
          />
        ))}
      </ul>
    </>
  );
};

export default UsersList;
