import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from "../../shared/hooks/http-hook";

import "./EachHome.css";

const EachHome = () => {
  const [searchedPlace, setSearchedPlace] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [creator, setCreator] = useState();
  const [creatorData, setCreatorData] = useState();
  const placeId = useParams().homeId;

  useEffect(() => {
    const fetchPlaceById = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setSearchedPlace(response.place);
        setCreator(response.place.creator);
      } catch (err) {}
    };
    fetchPlaceById();
  }, [placeId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/agent/${creator}`
        );
        setCreatorData(response.user);
      } catch (err) {}
    };

    fetchUser();
  }, [creator, sendRequest]);

  return (
    <>
      <div className="home__container">
        <div className="home__container__firstRow">
          <div className="home-image left-col">
            <img
              src={`https://images.pexels.com/photos/3701434/pexels-photo-3701434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="home-details right-col">
            <div className="home-details__title">
              {" "}
              {searchedPlace && searchedPlace.title}{" "}
            </div>
            <div style={{ color: "rgb(13, 186, 232)", lineHeight: "34.3px" }}>
              ${searchedPlace && searchedPlace.price} Monthly
            </div>
            <div className="home-details items-container">
              <div className="home-details left-items">
                <div className="home-details__item">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="meta-icon-container"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        class="meta-icon"
                        fill="#0DBAE8"
                        d="M46 16v-12c0-1.104-.896-2.001-2-2.001h-12c0-1.103-.896-1.999-2.002-1.999h-11.997c-1.105 0-2.001.896-2.001 1.999h-12c-1.104 0-2 .897-2 2.001v12c-1.104 0-2 .896-2 2v11.999c0 1.104.896 2 2 2v12.001c0 1.104.896 2 2 2h12c0 1.104.896 2 2.001 2h11.997c1.106 0 2.002-.896 2.002-2h12c1.104 0 2-.896 2-2v-12.001c1.104 0 2-.896 2-2v-11.999c0-1.104-.896-2-2-2zm-4.002 23.998c0 1.105-.895 2.002-2 2.002h-31.998c-1.105 0-2-.896-2-2.002v-31.999c0-1.104.895-1.999 2-1.999h31.998c1.105 0 2 .895 2 1.999v31.999zm-5.623-28.908c-.123-.051-.256-.078-.387-.078h-11.39c-.563 0-1.019.453-1.019 1.016 0 .562.456 1.017 1.019 1.017h8.935l-20.5 20.473v-8.926c0-.562-.455-1.017-1.018-1.017-.564 0-1.02.455-1.02 1.017v11.381c0 .562.455 1.016 1.02 1.016h11.39c.562 0 1.017-.454 1.017-1.016 0-.563-.455-1.019-1.017-1.019h-8.933l20.499-20.471v8.924c0 .563.452 1.018 1.018 1.018.561 0 1.016-.455 1.016-1.018v-11.379c0-.132-.025-.264-.076-.387-.107-.249-.304-.448-.554-.551z"
                      ></path>
                    </svg>
                  </i>
                  <div>
                    <p> Area </p>
                    <p className="home-details-dynamic">
                      {" "}
                      {searchedPlace && searchedPlace.area} SQFT
                    </p>
                  </div>
                </div>
                <div className="home-details__item">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="meta-icon-container"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        class="meta-icon"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        fill="#0DBAE8"
                        d="M24 48.001c-13.255 0-24-10.745-24-24.001 0-13.254 10.745-24 24-24s24 10.746 24 24c0 13.256-10.745 24.001-24 24.001zm10-27.001l-10-8-10 8v11c0 1.03.888 2.001 2 2.001h3.999v-9h8.001v9h4c1.111 0 2-.839 2-2.001v-11z"
                      ></path>
                    </svg>
                  </i>
                  <div>
                    <p> Type </p>
                    <p className="home-details-dynamic">
                      {" "}
                      {searchedPlace && searchedPlace.type}
                    </p>
                  </div>
                </div>
                <div className="home-details__item">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="meta-icon-container"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        class="meta-icon"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        fill="#0DBAE8"
                        d="M47.199 24.176l-23.552-23.392c-.504-.502-1.174-.778-1.897-.778l-19.087.09c-.236.003-.469.038-.696.1l-.251.1-.166.069c-.319.152-.564.321-.766.529-.497.502-.781 1.196-.778 1.907l.092 19.124c.003.711.283 1.385.795 1.901l23.549 23.389c.221.218.482.393.779.523l.224.092c.26.092.519.145.78.155l.121.009h.012c.239-.003.476-.037.693-.098l.195-.076.2-.084c.315-.145.573-.319.791-.539l18.976-19.214c.507-.511.785-1.188.781-1.908-.003-.72-.287-1.394-.795-1.899zm-35.198-9.17c-1.657 0-3-1.345-3-3 0-1.657 1.343-3 3-3 1.656 0 2.999 1.343 2.999 3 0 1.656-1.343 3-2.999 3z"
                      ></path>
                    </svg>
                  </i>
                  <div>
                    <p> Status </p>
                    <p className="home-details-dynamic">
                      {" "}
                      {searchedPlace && searchedPlace.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className="home-details right-items">
                <div className="home-details__item">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="meta-icon-container"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        class="meta-icon"
                        fill="#0DBAE8"
                        d="M21 48.001h-19c-1.104 0-2-.896-2-2v-31c0-1.104.896-2 2-2h19c1.106 0 2 .896 2 2v31c0 1.104-.895 2-2 2zm0-37.001h-19c-1.104 0-2-.895-2-1.999v-7.001c0-1.104.896-2 2-2h19c1.106 0 2 .896 2 2v7.001c0 1.104-.895 1.999-2 1.999zm25 37.001h-19c-1.104 0-2-.896-2-2v-31c0-1.104.896-2 2-2h19c1.104 0 2 .896 2 2v31c0 1.104-.896 2-2 2zm0-37.001h-19c-1.104 0-2-.895-2-1.999v-7.001c0-1.104.896-2 2-2h19c1.104 0 2 .896 2 2v7.001c0 1.104-.896 1.999-2 1.999z"
                      ></path>
                    </svg>
                  </i>
                  <div>
                    <p> Bedrooms </p>
                    <p className="home-details-dynamic">
                      {" "}
                      {searchedPlace && searchedPlace.bedrooms}
                    </p>
                  </div>
                </div>
                <div className="home-details__item">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="meta-icon-container"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        class="meta-icon"
                        fill="#0DBAE8"
                        d="M37.003 48.016h-4v-3.002h-18v3.002h-4.001v-3.699c-4.66-1.65-8.002-6.083-8.002-11.305v-4.003h-3v-3h48.006v3h-3.001v4.003c0 5.223-3.343 9.655-8.002 11.305v3.699zm-30.002-24.008h-4.001v-17.005s0-7.003 8.001-7.003h1.004c.236 0 7.995.061 7.995 8.003l5.001 4h-14l5-4-.001.01.001-.009s.938-4.001-3.999-4.001h-1s-4 0-4 3v17.005000000000003h-.001z"
                      ></path>
                    </svg>
                  </i>
                  <div>
                    <p> Bathrooms </p>
                    <p className="home-details-dynamic">
                      {" "}
                      {searchedPlace && searchedPlace.bathrooms}{" "}
                    </p>
                  </div>
                </div>
                <div className="home-details__item">
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="meta-icon-container"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        class="meta-icon"
                        fill="#0DBAE8"
                        d="M44 0h-40c-2.21 0-4 1.791-4 4v44h6v-40c0-1.106.895-2 2-2h31.999c1.106 0 2.001.895 2.001 2v40h6v-44c0-2.209-1.792-4-4-4zm-36 8.001h31.999v2.999h-31.999zm0 18h6v5.999h-2c-1.104 0-2 .896-2 2.001v6.001c0 1.103.896 1.998 2 1.998h2v2.001c0 1.104.896 2 2 2s2-.896 2-2v-2.001h11.999v2.001c0 1.104.896 2 2.001 2 1.104 0 2-.896 2-2v-2.001h2c1.104 0 2-.895 2-1.998v-6.001c0-1.105-.896-2.001-2-2.001h-2v-5.999h5.999v-3h-31.999v3zm8 12.999c-1.104 0-2-.895-2-1.999s.896-2 2-2 2 .896 2 2-.896 1.999-2 1.999zm10.5 2h-5c-.276 0-.5-.225-.5-.5 0-.273.224-.498.5-.498h5c.275 0 .5.225.5.498 0 .275-.225.5-.5.5zm1-2h-7c-.275 0-.5-.225-.5-.5s.226-.499.5-.499h7c.275 0 .5.224.5.499s-.225.5-.5.5zm-6.5-2.499c0-.276.224-.5.5-.5h5c.275 0 .5.224.5.5s-.225.5-.5.5h-5c-.277 0-.5-.224-.5-.5zm11 2.499c-1.104 0-2.001-.895-2.001-1.999s.896-2 2.001-2c1.104 0 2 .896 2 2s-.896 1.999-2 1.999zm0-12.999v5.999h-16v-5.999h16zm-24-13.001h31.999v3h-31.999zm0 5h31.999v3h-31.999z"
                      ></path>
                    </svg>
                  </i>
                  <div>
                    <p> Garages </p>
                    <p className="home-details-dynamic">
                      {" "}
                      {searchedPlace && searchedPlace.garages}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home__container__secondRow">
          <div className="home-description left-col">
            <div className="description__container">
              <h3 style={{ color: "#0dbae8" }}>Description</h3>
              <div className="description__text">
                {searchedPlace && searchedPlace.description}
              </div>
            </div>
            <div className="description__container location">
              <h3 style={{ color: "#0dbae8" }}> Location </h3>
              {searchedPlace && searchedPlace.location.lat}
            </div>
          </div>
          <div className="home-description right-col">
            <div className="agent-info">
              <div className="agent-avatar">
                <img
                  src={`https://poltronanerd.com.br/wp-content/uploads/2020/05/Avatar-1280x720-1.jpg`}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ marginRight: "25px" }}>
                <p style={{ color: "#fff" }}> Alice Brian </p>
                <p style={{ color: "rgb(0, 128, 190)", fontSize: "15px" }}>
                  {" "}
                  Real Estate Agent
                </p>
              </div>
            </div>
            <div className="agent-contact">
              <p>
                <i>
                  <i className="fas fa-mobile-alt"></i>
                </i>
                Mobile:{" "}
                <span className="agent-contact__dynamic">
                  {" "}
                  {creatorData && creatorData.mobile}{" "}
                </span>
              </p>
              <p>
                <i className="fas fa-phone"></i> Office:{" "}
                <span className="agent-contact__dynamic">
                  {" "}
                  {creatorData && creatorData.office}{" "}
                </span>
              </p>
              <p>
                <i class="fas fa-fax"></i> Fax:{" "}
                <span className="agent-contact__dynamic">
                  {" "}
                  {creatorData && creatorData.fax}{" "}
                </span>
              </p>
              <p>
                <i class="fas fa-map-marker-alt"></i>
                <span style={{ marginLeft: "8px" }}>
                  Location:{" "}
                  <span className="agent-contact__dynamic">
                    {" "}
                    {creatorData && creatorData.location}{" "}
                  </span>
                </span>
              </p>
              <p>
                <i class="far fa-envelope"></i>

                <span style={{ marginLeft: "5px" }}>
                  Email:{" "}
                  <span className="agent-contact__dynamic">
                    {creatorData && creatorData.contactemail}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachHome;
