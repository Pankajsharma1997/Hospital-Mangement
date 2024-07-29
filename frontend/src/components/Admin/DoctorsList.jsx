import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import addNotification from "react-push-notification";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Styles.css";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  //  Get Doctors List Start 
  const getDoctors = async () => {
    try {
      const response = await axios.get(`/api/doctors_list`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error Fetching Doctors:", error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  const deleteDoctorDetail = (id) => {
    // Ask the Admin for confirmation before deleting
    const adminConfirmed = window.confirm(
      " Are you sure want to Delete the doctor details permanently"
    );

    //   If the Admin click on 'Ok', proceed the deletion function
    if (adminConfirmed) {
      axios.delete(`/api/deleteDoctor-detail/` + id). then((result)=> {
        console.log(result);

        // Update local state without reloading the page
        const updatedDoctorList = doctors.filter((doctor) => doctor._id !== id);
        setDoctors(updatedDoctorList);
        /**
         * show the warning message when admin delete the job from the table
         */
        // addNotification({
        //   title: "Warning",
        //   subtitle: "You have successfully Delete Job Post",
        //   message: "The Job post is Remove from job table as well as DB",
        //   theme: "light",
        //   closeButton: "X",
        //   backgroundTop: "sucess",
        //   backgroundBottom: "yellowgreen",
        // });
      });
    }
  };

  //  Delete the doctor card From the page and 

  return (
    <>
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
              <h2 className="text-center m-3">Our Doctors</h2>
            </div>

            {/* Show doctors List */}
            <div className="d-flex flex-row flex-wrap justify-content-center">
              {doctors.length === 0 ? (
                <h2>No Record Found</h2>
              ) : (
                doctors.map((doctor, index) => (
                  <div key={index} className="doctor-card">
                    <Card
                      className="text-center m-3"
                      style={{ width: "18rem" }}
                    >
                      <Card.Img
                        variant="top"
                        src={`/api/${doctor.doctorImg}`}
                        alt="Doctor image"
                      />
                      <Card.Body>
                        <Card.Title>
                          Dr. {doctor.doctorFirstName} {doctor.doctorLastName}
                        </Card.Title>

                        <Card.Title>
                          <span> Specialty </span>: {doctor.specialty}
                        </Card.Title>
                        {/* <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text> */}

                        {/*  Add a Edit Button for edit the doctor details  */}
                        <Link to={"/edit_doctor/" + doctor._id}>
                          <Button
                            variant="outline-success"
                            className="m-1"
                            size="lg"
                          >
                            Edit
                          </Button>
                        </Link>

                        <Button
                          variant="outline-danger"
                          className="m-3"
                          size="lg"
                          onClick={() => deleteDoctorDetail(doctor._id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DoctorsList;
