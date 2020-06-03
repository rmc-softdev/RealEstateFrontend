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
    <ul className="nav-links">
      <li>
        <NavLink to="/agents" exact>
          Agent Finder
        </NavLink>
      </li>
      <li>
        <NavLink to="/homes/new" exact>
          New Homes
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>Manage Rentals</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Post Rentals</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Submit property</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}> Logout </button>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Avatar
            image={`${process.env.REACT_APP_ASSET_URL}/${auth.userAvatar}`}
            alt={props.name}
            style={{ width: "32px", height: "32px" }}
          />
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
