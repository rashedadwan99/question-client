import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import Cimg from "../img/Cimg";
import LoadingIcon from "../../../assets/images/google icon GIF.gif";
function LoadingScreen() {
  useEffect(() => {
    const body = document.getElementById("body");

    body.style.backgroundColor = "#ecf0f1";
    return () => {
      body.style.backgroundColor = ``;
    };
  }, []);
  return (
    <Row
      className="justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Cimg
        src={LoadingIcon}
        alt="loading"
        style={{ width: "300px", margin: "auto" }}
      />
    </Row>
  );
}

export default LoadingScreen;
