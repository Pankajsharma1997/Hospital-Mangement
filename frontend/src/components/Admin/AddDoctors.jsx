import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AddDoctors() {
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [specialty, setSpecialty] = useState(" ");
  const [mobile, setMobile] = useState(" ");
  const [address, setAddress] = useState(" ");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file ) {
        setError(true);
        return false;
      }

      const formData = new FormData();
      formData.append("doctorImg", file); // Append the file
      //  append other data
      formData.append("doctorFirstName",doctorFirstName);
      formData.append("doctorLastName", doctorLastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("identityNumber",identityNumber);
      formData.append("specialty", specialty);
      formData.append("mobile", mobile);
      formData.append("address", address);

      const response = await axios.post(
        "/api/add-doctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Log the response from the server
      if (response.status === 200) {
        navigate("/dashboard"); // Redirect to the home page
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
 

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>

        <Col md={10}>
          <div>
            <Header />
          </div>

          <div>
            <h2 className="text-center"> Add a Doctor </h2>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label> FirstName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    pattern="[A-Za-z]{2,20}"
                    title="First Name must contain only Letter"
                    onChange={(e) => setDoctorFirstName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>LastName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    pattern="[A-Za-z]{2,10}"
                    onChange={(e) => setDoctorLastName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridIdentityNumber">
                <Form.Label>Identity Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter identity Number"
                  pattern="^\d{12}$"
                  title="Enter valid NIC number (ex - 296613008981)"
                  onChange={(e) => setIdentityNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridSpeacialty">
                <Form.Label>Speciality</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Speciality"
                  onChange={(e) => setSpecialty(e.target.value)}
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Enter Mobile Number"
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDoctorImg">
                  <Form.Label>Imgae </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    placeholder="choose an Image"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {error && !file && <span> Please Choose an image </span>}
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddDoctors;
