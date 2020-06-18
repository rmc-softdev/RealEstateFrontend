import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <motion.li className="user-item" whileHover={{ scale: 1.03 }}>
      <Card className="user-item__content" style={{ position: "relative" }}>
        <Link
          to={`/${props.id}/places`}
          style={{ backgroundColor: "rgb(2, 45, 87)" }}
        >
          <img
            src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
            style={{ width: "100%" }}
            alt=""
          />
          <div className="user-item__info">
            <h3
              style={{
                position: "absolute",
                top: "187px",
                right: "1px",
                padding: "5px",
                fontSize: "16px",
                backgroundColor: "rgb(20, 41, 68)",
              }}
            >
              {props.placeCount}{" "}
              {props.placeCount === 1 ? "Property listed" : "Properties listed"}
            </h3>
          </div>
        </Link>
        <h2
          style={{
            color: "#444",
            textAlign: "center",
            top: 0,
            right: 0,
          }}
        >
          {props.name}
        </h2>
        <div
          className="agent-contact"
          style={{ color: "black", padding: "0 10px", height: "250px" }}
        >
          <p>
            <i>
              <i className="fas fa-mobile-alt"></i>
            </i>
            Mobile:{" "}
            <span className="agent-contact__dynamic">{props.mobile} </span>
          </p>
          <p>
            <i className="fas fa-phone"></i> Office:{" "}
            <span className="agent-contact__dynamic"> {props.office}</span>
          </p>
          <p>
            <i class="fas fa-fax"></i> Fax:{" "}
            <span className="agent-contact__dynamic"> {props.fax}</span>
          </p>
          <p>
            <i class="fas fa-map-marker-alt"></i>
            <span style={{ marginLeft: "8px" }}>
              Location:{" "}
              <span className="agent-contact__dynamic"> {props.location}</span>
            </span>
          </p>
          <p>
            <i class="far fa-envelope"></i>

            <span style={{ marginLeft: "5px" }}>
              Email:{" "}
              <span className="agent-contact__dynamic">
                {props.contactemail}
              </span>
            </span>
          </p>
        </div>
      </Card>
    </motion.li>
  );
};

export default UserItem;
