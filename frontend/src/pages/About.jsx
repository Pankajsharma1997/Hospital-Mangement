import React, { useState, useEffect } from "react";
import axios from "axios";

const About = ({ token }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/about", {
          headers: {
            Authorization: token,
          },
        });
        setProfileData(res.data);
      } catch (error) {
        alert("Failed to fetch profile");
      }
    };
    if (token) {
      fetchProfile();
    }
  }, [token]);
  return (
    <>
      <div>
        <h2>Profile</h2>
        {profileData ? (
          <p>Welcome, {profileData.patientId}</p>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </>
  );
};

export default About;

// const Profile = ({ token }) => {
//   const [profileData, setProfileData] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/profile", {
//           headers: {
//             Authorization: token,
//           },
//         });
//         setProfileData(res.data);
//       } catch (error) {
//         alert("Failed to fetch profile");
//       }
//     };

//     if (token) {
//       fetchProfile();
//     }
//   }, [token]);

//   return (
//     <div>
//       <h2>Profile</h2>
//       {profileData ? (
//         <p>Welcome, {profileData.username}</p>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };
