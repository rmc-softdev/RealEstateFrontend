import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="background-overlay">
        <div className="main__container">
          <div className="main__slogan__container">
            <p className="main__slogan__container__title">
              Find your next{" "}
              <Link to="/homes/new" style={{ color: "#000" }}>
                {" "}
                Home{" "}
              </Link>
            </p>
            <p className="main__slogan__container__subtitle">
              We’ll help you find a place you’ll love.
            </p>
          </div>
        </div>
      </div>
      <div className="main__content__container">
        <div className="sloganShowCase__container">
          <div className="sloganShowCase__slogan__container">
            <p className="sloganShowCase__slogan__container__title">
              We have the most listings and constant updates.
            </p>
            <p
              className="sloganShowCase__slogan__container__subtitle"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              So you’ll never miss out.
            </p>
            <div className="SloganShowCase__container--separator"></div>
          </div>
        </div>
        <div className="submit__container">
          <div className="submit__container__slogan">
            <h3>
              <span className="submit__container__slogan--yellow"> SUBMIT</span>
              <span className="submit__container__slogan--blue">PROPERTY</span>
            </h3>
            <h5>
              <i className="far fa-hand-point-down" id="pointer"></i>
              <span className="submit__container__slogan__subtitle">
                {" "}
                Add your property to our list has never been easier{" "}
              </span>
            </h5>
          </div>
          <div className="submit__container__cards">
            <div className="submit__container__cards_card" id="no-margin">
              <div className="submit__container__cards__imgCard">
                <div className="submit__container__cards__imgCard--inner">
                  <i class="fas fa-user-plus fa-3x"></i>
                </div>
              </div>
              <p className="sign">Sign up / Register</p>
              <p className="sign__text">
                You can either access our properties by searching through homes
                or agents. If you're an agent, Sign Up with us and become part
                of our family.
              </p>
            </div>
            <div className="submit__container__cards_card">
              <div className="submit__container__cards__imgCard">
                <div className="submit__container__cards__imgCard--inner">
                  <i className="fas fa-clipboard-list fa-3x"></i>
                </div>
              </div>
              <p className="sign">Fill Up Property Details</p>
              <p className="sign__text">
                Fill up your property details with description, status, price
                and such properties features.
              </p>
            </div>
            <div className="submit__container__cards_card">
              <div className="submit__container__cards__imgCard">
                <div className="submit__container__cards__imgCard--inner">
                  <i className="fas fa-globe fa-3x"></i>
                </div>
              </div>
              <p className="sign">You are Done!</p>
              <p className="sign__text">
                Now you can easily submit and manage your properties in agent
                dashboard with just a few simple steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
