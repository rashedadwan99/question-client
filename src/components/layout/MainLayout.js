import { Col, Row } from "react-bootstrap";
import Header from "../header/Header";

function MainLayout({ children, showHeader = true }) {
  return (
    <>
      {showHeader && <Header />}
      <Row
        className={`justify-content-center align-items-center${
          !showHeader ? " py-5" : ""
        }`}
      >
        <Col xs={10} sm={11} md={11}>
          {children}
        </Col>
      </Row>
    </>
  );
}

export default MainLayout;
