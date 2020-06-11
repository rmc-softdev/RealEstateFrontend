import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";
import Button from "../FormElements/Button";

const MainNavigation = (props) => {
  const [transparency, setTransparency] = useState(true);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  let match = useRouteMatch("/");

  useEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset >= 1) {
        setTransparency(false);
      } else {
        setTransparency(true);
      }
    };
  }, [match]);

  useEffect(() => {
    if (!match.isExact) {
      setTransparency(false);
    }

    if (match.isExact && window.pageYOffset <= 1) {
      setTransparency(true);
    }
  }, [match]);

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

      <MainHeader transparency={transparency}>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span
            style={{ backgroundColor: `${!transparency ? "#000" : "#fff"}` }}
          />
          <span
            style={{ backgroundColor: `${!transparency ? "#000" : "#fff"}` }}
          />
          <span
            style={{ backgroundColor: `${!transparency ? "#000" : "#fff"}` }}
          />
        </button>
        <h1 className="main-navigation__title">
          <Link
            to="/"
            className={`${transparency ? "nav--scroll--active" : ""}`}
          >
            Snug
            <img
              src="https://img.icons8.com/cotton/64/000000/home--v1.png"
              alt="App icon"
              style={{ width: "40px" }}
              className={`${transparency ? "nav--scroll--active" : ""}`}
            />
            Homes
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks transparency={transparency} />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
