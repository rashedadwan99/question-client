import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../header/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Row className="justify-content-center align-items-center">
        <Col xs={12} sm={12} md={12}>
          {children}
        </Col>
      </Row>
    </>
  );
}

export default MainLayout;
