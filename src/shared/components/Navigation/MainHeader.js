import React from "react";

import "./MainHeader.css";

const MainHeader = (props) => {
  return (
    <header className={`main-header ${props.transparency ? "active" : ""}`}>
      {props.children}
    </header>
  );
};

export default MainHeader;
