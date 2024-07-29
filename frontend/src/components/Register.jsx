import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const Register = () => {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        patientName,
        email,
        password,
        gender
      });

      console.log(response.data); // Log the response from the server
      if (response.status === 200) {
        navigate("/ "); // Redirect to the home page
      }
    } catch (error) {
      setError(error.response.data.message);
      console.error("Registration error:", error);
    }
  };

  return (
    <section
      // className="vh-100"
      style={{
        backgroundColor: "#7091E6",
        height: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <Container className="h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col lg={12} xl={11}>
            <Card className="text-black" style={{ borderRadius: "25px" }}>
              <Card.Body className="p-md-5">
                <Row className="justify-content-center">
                  <Col md={10} lg={6} xl={5} className="order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      {/* For Register the Name  */}
                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <Form.Control
                          type="text"
                          id="form3Example1c"
                          placeholder="Your Name"
                          onChange={(e) => setPatientName(e.target.value)}
                        />
                      </Form.Group>

                      {/* For Register the Email  */}
                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <Form.Control
                          type="email"
                          id="form3Example3c"
                          placeholder="Your Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      {/* For Resgister the Password  */}
                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <Form.Control
                          type="password"
                          id="form3Example4c"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>

                      {/* For Choosing Gender */}
                      <Form.Group className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-venus-mars fa-lg me-3 fa-fw"></i>
                        <Form.Check
                          type="radio"
                          id="genderMale"
                          name="gender"
                          label="Male"
                          value="Male"
                          onChange={(e) => setGender(e.target.value)}
                          className="me-3"
                        />
                        <Form.Check
                          type="radio"
                          id="genderFemale"
                          name="gender"
                          label="Female"
                          value="Female"
                          onChange={(e) => setGender(e.target.value)}
                          className="me-3"
                        />
                        <Form.Check
                          type="radio"
                          id="genderOther"
                          name="gender"
                          label="Other"
                          value="Other"
                          onChange={(e) => setGender(e.target.value)}
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </Button>
                      </div>
                    </Form>
                  </Col>
                  <Col
                    md={10}
                    lg={6}
                    xl={7}
                    className="d-flex align-items-center order-1 order-lg-2"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;

<section className="vh-100" style={{ backgroundColor: "#eee" }}>
  <Container className="h-100">
    <Row className="d-flex justify-content-center align-items-center h-100">
      <Col lg={12} xl={11}>
        <Card className="text-black" style={{ borderRadius: "25px" }}>
          <Card.Body className="p-md-5">
            <Row className="justify-content-center">
              <Col md={10} lg={6} xl={5} className="order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>
                <Form className="mx-1 mx-md-4">
                  <Form.Group className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <Form.Control
                      type="text"
                      id="form3Example1c"
                      placeholder="Your Name"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <Form.Control
                      type="email"
                      id="form3Example3c"
                      placeholder="Your Email"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <Form.Control
                      type="password"
                      id="form3Example4c"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <Form.Control
                      type="password"
                      id="form3Example4cd"
                      placeholder="Repeat your password"
                    />
                  </Form.Group>
                  <Form.Group className="form-check d-flex justify-content-center mb-5">
                    <Form.Check
                      type="checkbox"
                      id="form2Example3c"
                      label="I agree all statements in Terms of service"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <Button type="button" className="btn btn-primary btn-lg">
                      Register
                    </Button>
                  </div>
                </Form>
              </Col>
              <Col
                md={10}
                lg={6}
                xl={7}
                className="d-flex align-items-center order-1 order-lg-2"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>;
// );
// };

// export default SignUp;
