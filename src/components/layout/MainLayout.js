import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../header/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Row className="justify-content-center align-items-center">
        <Col xs={10} sm={11} md={11}>
          {children}
        </Col>
      </Row>
    </>
  );
}

export default MainLayout;
