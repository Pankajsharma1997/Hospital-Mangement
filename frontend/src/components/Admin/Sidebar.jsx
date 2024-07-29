import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Styles.css";
import medicineImage from "../../assets/Images/logo.png";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <Container>
      <Row>
        <Col md={12} className="sidebar_border">
          <div>
            <Link to="/dashboard">
              {" "}
              <img
                src={medicineImage}
                className="heading_icon"
                alt="Medicine"
              />
            </Link>
          </div>

          <div className="m-1">
            <Link to="/add_doctor" className="sidebar-links">
              {" "}
              Add Doctor{" "}
            </Link>
          </div>

          <div className="m-1">
            <Link to="/doctors" className="sidebar-links">
              {" "}
              Doctors{" "}
            </Link>
          </div>

          <div className="m-1">
            <Link to="#" className="sidebar-links">
              {" "}
              Add Staff {" "}
            </Link>
          </div>

          <div className="m-1">
            <Link to="#" className="sidebar-links">
              {" "}
              Patients List{" "}
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Sidebar;
