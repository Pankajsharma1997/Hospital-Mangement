import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: token,
          },
        });
        setProfile(response.data);
      } catch (error) {
        setError(
          err.response ? err.response.data.message : "Error fetching profile"
        );
      }
    };
    fetchProfile();
  }, []);
  if (!profile) {
    return <div>Loading...</div>;
  }

  //logout Functionality
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div>
        <h1>Profile</h1>

        <p>
          <strong>Name:</strong> {profile.patientName}
        </p>

        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        {/* Add more fields as necessary */}
      </div>

      <div>
        <button onClick={logout}> logout </button>
      </div>
    </>
  );
};
export default Profile;
