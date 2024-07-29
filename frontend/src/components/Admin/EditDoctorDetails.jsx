import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Header from "./Header";

function EditDoctorDetails() {
  const { id } = useParams();
  const [doctorDetail, setDoctorDetail] = useState({});
  const [editableId, setEditableId] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedIdentityNumber, setEditedIdentityNumber] = useState("");
  const [editedSpecialty, setEditedSpecialty] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedImage, setEditedImage] = useState(null);

  useEffect(() => {
    getdoctordetail(id);
  }, [id]);

  //  Fetch the doctor detail on the basis of the id
  const getdoctordetail = async (id) => {
    try {
      const response = await axios.get(`/api/edit-doctor-detail/${id}`);
      setDoctorDetail(response.data);

      console.log(response);
    } catch (error) {
      console.error("error in fetching the doctor details", error);
    }
  };

  const toggleEditable = (id) => {
    if (doctorDetail && doctorDetail._id === id) {
      setEditableId(id);
      setEditedFirstName(doctorDetail.doctorFirstName);
      setEditedLastName(doctorDetail.doctorLastName);
      setEditedEmail(doctorDetail.email);
      setEditedIdentityNumber(doctorDetail.identityNumber);
      setEditedSpecialty(doctorDetail.specialty);
      setEditedMobile(doctorDetail.mobile);
      setEditedAddress(doctorDetail.address);
    } else {
      setEditableId(null);
      setEditedFirstName("");
      setEditedLastName("");
      setEditedEmail("");
      setEditedIdentityNumber("");
      setEditedSpecialty(" ");
      setEditedMobile("");
      setEditedAddress("");
    }
  };

  const saveEditedDetail = async (id) => {
    const formData = new FormData();
    formData.append("doctorFirstName", editedFirstName);
    formData.append("doctorLastName", editedLastName);
    formData.append("email", editedEmail);
    formData.append("identityNumber", editedIdentityNumber);
    formData.append("specialty", editedSpecialty);
    formData.append("mobile", editedMobile);
    formData.append("address", editedAddress);
    if (editedImage) {
      formData.append("doctorImg", editedImage);
    }

    if (
      !editedFirstName ||
      !editedLastName ||
      !editedEmail ||
      !editedIdentityNumber ||
      !editedMobile ||
      !editedAddress
    ) {
      alert("Please fill all the details");
      return;
    }

    try {
      const result = await axios.post(
        `/api/update-doctordetail/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      setEditableId(null);
      setEditedFirstName("");
      setEditedLastName("");
      setEditedEmail("");
      setEditedIdentityNumber("");
      setEditedSpecialty("");
      setEditedMobile("");
      setEditedAddress("");
      setEditedImage(null);

      // Update doctor detail data without reloading the page
      if (doctorDetail._id === id) {
        setDoctorDetail({ ...doctorDetail, ...result.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editableId === doctorDetail._id) {
      saveEditedDetail(doctorDetail._id);
    } else {
      toggleEditable(doctorDetail._id);
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

          <h2 className="text-center m-4"> Edit & Update Doctor Details </h2>

          <Row>
            <Col md={6}>
              <div>
                {/* <h4 className="text-center"> Doctor Image </h4> */}
                <img
                  src={`/api/${doctorDetail.doctorImg}`}
                  alt="Doctor image"
                  width="400"
                  height="400"
                  className="m-1"
                />

                {editableId === doctorDetail._id && (
                  <Form.Control
                    type="file"
                    className="form-control"
                    onChange={(e) => setEditedImage(e.target.files[0])}
                  />
                )}
              </div>
            </Col>

            <Col md={6}>
              <div className="detail-container">
                <form onSubmit={handleSubmit}>
                  <div className="detailpart">
                    <h3> First Name :- </h3>
                    {editableId === doctorDetail._id ? (
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={editedFirstName}
                        pattern="[A-Za-z]{2,20}"
                        title="First Name must contain only Letter"
                        onChange={(e) => setEditedFirstName(e.target.value)}
                      />
                    ) : (
                      <h3> {doctorDetail.doctorFirstName} </h3>
                    )}
                  </div>

                  <div className="detailpart">
                    <h3> Last Name :- </h3>
                    {editableId === doctorDetail._id ? (
                      <Form.Control
                        type="text"
                        className="form-control m"
                        value={editedLastName}
                        onChange={(e) => setEditedLastName(e.target.value)}
                      />
                    ) : (
                      <h3> {doctorDetail.doctorLastName} </h3>
                    )}
                  </div>

                  <div className="detailpart">
                    <h3> Email :- </h3>
                    {editableId === doctorDetail._id ? (
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                    ) : (
                      <h3> {doctorDetail.email}</h3>
                    )}
                  </div>

                  <div className="detailpart">
                    <h3> Identity Number </h3>
                    {editableId === doctorDetail._id ? (
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={editedIdentityNumber}
                        pattern="^\d{12}$"
                        title="Enter valid NIC number (ex - 296613008981)"
                        onChange={(e) =>
                          setEditedIdentityNumber(e.target.value)
                        }
                      />
                    ) : (
                      <h3> {doctorDetail.identityNumber}</h3>
                    )}
                  </div>

                  <div className="detailpart">
                    <h3> Specialty </h3>
                    {editableId === doctorDetail._id ? (
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={editedSpecialty}
                        onChange={(e) => setEditedSpecialty(e.target.value)}
                      />
                    ) : (
                      <h3> {doctorDetail.specialty}</h3>
                    )}
                  </div>

                  <div className="detailpart">
                    <h3> Mobile </h3>
                    {editableId === doctorDetail._id ? (
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={editedMobile}
                        onChange={(e) => setEditedMobile(e.target.value)}
                      />
                    ) : (
                      <h3> {doctorDetail.mobile} </h3>
                    )}
                  </div>

                  <div className="detailpart">
                    <h3> Address </h3>
                    {editableId === doctorDetail._id ? (
                      <Form.Control
                        type="text"
                        className="form-control"
                        value={editedAddress}
                        onChange={(e) => setEditedAddress(e.target.value)}
                      />
                    ) : (
                      <h3> {doctorDetail.address} </h3>
                    )}
                  </div>

                  <div>
                    {editableId === doctorDetail._id ? (
                      <button
                        className="edit-custom-btn"
                        // onClick={() => saveEditedDetail(doctorDetail._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-custom-btn"
                        // onClick={() => toggleEditable(doctorDetail._id)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default EditDoctorDetails;
