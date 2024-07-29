import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Styles.css"

const Dashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("admintoken");
        const response = await axios.get("http://localhost:5000/dashboard", {
          headers: {
            Authorization: token,
          },
        });
        setAdmin(response.data);
      } catch (error) {
        setError(
          err.response ? err.response.data.message : "Error fetching profile"
        );
      }
    };
    fetchProfile();
  }, []);
  if (!admin) {
    return <div>Loading...</div>;
  }

  //logout Functionality
  const logout = () => {
    localStorage.clear();
    navigate("/admin_login");
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>

        <Col md={10}>
          <Header />
          <p>
            <strong>Name:</strong> {admin.adminName}
          </p>

          <p>
            <strong>Email:</strong> {admin.email}
          </p>
          {/* Add more fields as necessary */}
          <Button onClick={logout}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
