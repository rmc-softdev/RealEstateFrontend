import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";
import Button from "../FormElements/Button";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      <SideDrawer show={drawerIsOpen}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks closeBtn closeDrawerHandler={closeDrawerHandler} />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span style={{ backgroundColor: "#000" }} />
          <span style={{ backgroundColor: "#000" }} />
          <span style={{ backgroundColor: "#000" }} />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">
            Snug
            <img
              src="https://image.freepik.com/free-vector/illustration-hand-house-real-estate-icon_53876-6142.jpg"
              alt=""
              style={{ width: "60px", height: "60px" }}
            />
            Homes
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
