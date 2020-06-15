import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Avatar from "../UIElements/Avatar";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const response = await fetch();
      } catch (err) {}
    };
  }, ["id"]);

  return (
    <ul className="nav-links" style={{ position: "relative" }}>
      <li onClick={props.closeDrawerHandler}>
        <NavLink
          to="/homes/new"
          exact
          className={`${props.transparency ? "nav--scroll--active" : ""}`}
        >
          New Homes
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li onClick={props.closeDrawerHandler}>
          <NavLink
            className={`${props.transparency ? "nav--scroll--active" : ""}`}
            to={`/${auth.userId}/places`}
          >
            Manage Rentals
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li onClick={props.closeDrawerHandler}>
          <NavLink
            className={`${props.transparency ? "nav--scroll--active" : ""}`}
            to="/places/new"
          >
            Post Rentals
          </NavLink>
        </li>
      )}
      <li onClick={props.closeDrawerHandler}>
        <NavLink
          className={`${props.transparency ? "nav--scroll--active" : ""}`}
          to="/agents"
          exact
        >
          Find an Agent
        </NavLink>
      </li>
      {!auth.isLoggedIn && (
        <li onClick={props.closeDrawerHandler}>
          <NavLink
            className={`${props.transparency ? "nav--scroll--active" : ""}`}
            to="/auth"
          >
            Submit property
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li
          className={`${props.transparency ? "nav--scroll--active" : ""}`}
          onClick={props.closeDrawerHandler}
        >
          <button
            className={`${props.transparency ? "nav--scroll--active" : ""}`}
            onClick={auth.logout}
          >
            {" "}
            Logout{" "}
          </button>
        </li>
      )}
      {auth.isLoggedIn && (
        <li onClick={props.closeDrawerHandler}>
          <Avatar
            image={`${process.env.REACT_APP_ASSET_URL}/${auth.userAvatar}`}
            alt={props.name}
            style={{ width: "32px", height: "32px" }}
          />
        </li>
      )}
      {props.closeBtn && (
        <li style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              fontSize: "20px",
              cursor: "pointer",
              fontWeight: "600",
              left: "-30px",
              top: "20px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={props.closeDrawerHandler}
          >
            <span> Close </span>{" "}
            <i
              class="fas fa-times-circle"
              style={{ color: "red", fontSize: "20px", marginLeft: "6px" }}
            ></i>
          </div>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
