const express = require("express");
const bodyParser = require("body-parser");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const conDB = require("./config/db");
const Patient = require("./Models/Patient");
const Admin = require("./Models/Admin");
const Doctor = require("./Models/Doctor");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// connection of Database
conDB();

// router handler
app.get("/home", (req, res) => {
  res.status(200).json("You are welcome");
});

//   Admin Section

//  Register an Admin
app.post("/register_admin", async (req, res) => {
  try {
    const { adminName, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin Already Exists" });
    }
    const hashedPassword = await bycrypt.hash(password, 10);

    const newAdmin = new Admin({
      adminName,
      email,
      password: hashedPassword,
    });
    const adminCreated = await newAdmin.save();
    if (!adminCreated) {
      console.log("Admin Not created");
    } else {
      return res.status(200).send("Admin Has been created to the database");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//  Admin Login
app.post("/admin_login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).json({ message: "Admin Not found " });
    }
    // Validate Password
    const isPasswordValid = await bycrypt.compare(
      req.body.password,
      admin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate user object
    const adminObject = { adminId: admin._id, name: admin.adminName };

    // Generate JWT token
    const token = jwt.sign({ adminId: adminObject.adminId }, jwtSecret, {
      expiresIn: "12h",
    });

    // Result token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ messgae: "Server error" });
  }
});
// Middleware to verify jWT token
const verifyAdminToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token invalid" });
  }
};

// Dashboard route
app.get("/dashboard", verifyAdminToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password"); // Exclude the password field
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add Doctor Section start

// Set up storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initilize upload
const upload = multer({ storage: storage });

app.post("/add-doctor", upload.single("doctorImg"), async (req, res) => {
  const password = req.body.password;
  const hashedPassword = await bycrypt.hash(password, 10);
  Doctor.create({
    doctorFirstName: req.body.doctorFirstName,
    doctorLastName: req.body.doctorLastName,
    email: req.body.email,
    password: hashedPassword,
    identityNumber: req.body.identityNumber,
    specialty: req.body.specialty,
    mobile: req.body.mobile,
    address: req.body.address,
    doctorImg: req.file.path,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
// Add Doctor Section End

//  Get Doctors list Start
app.get("/doctors_list", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//  Get Doctors list End


// Edit & Update the doctors
app.get("/edit-doctor-detail/:id", async  (req,res)=>{
  try{
    const id = req.params.id;
    const doctorDetail =  await Doctor.findById({_id: id});
    res.json(doctorDetail);
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
})

// // Update the doctors details.
// app.post("/update-doctordetail/:id", upload.single("doctorImg"), async (req, res) => {
//   try{
//     const id = req.params.id;
//     const updateData = {
//       doctorFirstName : req.body.doctorFirstName,
//       doctorLastName  : req.body.doctorLastName,
//       email           : req.body.email,
//       identityNumber  : req.body.identityNumber,  
//       mobile          : req.body.mobile,
//       address         : req.body.address,
//       doctorImg: req.file ? req.file.filename : req.body.doctorImg, // Update image if new file is uploaded
//     }
//     const updatedDetails = await Doctor.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });
//     res.json(updatedDetails);

//   }catch(error){
//     res.status(500).json({message:error.message });
//   }
// }) 


app.post(
  "/update-doctordetail/:id",
  upload.single("doctorImg"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const doctor = await Doctor.findById(id);

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      // If a new image is uploaded, delete the old one
      if (req.file && doctor.doctorImg) {
        const oldImagePath = `./uploads/${doctor.doctorImg}`;
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted:", oldImagePath);
          }
        });
      }

      const updateData = {
        doctorFirstName: req.body.doctorFirstName,
        doctorLastName: req.body.doctorLastName,
        email: req.body.email,
        identityNumber: req.body.identityNumber,
        mobile: req.body.mobile,
        address: req.body.address,
        doctorImg: req.file ? req.file.path : doctor.doctorImg, // Update image if new file is uploaded
      };

      const updatedDetails = await Doctor.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      res.json(updatedDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


//  Delete the Doctor from the Database 
app.delete("/deleteDoctor-detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const doctorDetail = await Doctor.findByIdAndDelete({ _id: id });
    if (!doctorDetail) {
      return res.status(404).json({ message: "Doctor Detail  not found" });
    }
    res.json(doctorDetail);
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err });
  }
});






// Patient Section
app.post("/register", async (req, res) => {
  try {
    const { patientName, email, password, gender } = req.body;
    const existingPatient = await Patient.findOne({ email: req.body.email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const newPatient = new Patient({
      patientName,
      email,
      password: hashedPassword,
      gender,
    });
    const patientCreated = await newPatient.save();
    if (!patientCreated) {
      console.log("Patient cannot be created");
    } else {
      return res.status(200).send("user has been created to the database");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.body.email });
    if (!patient) {
      return res.status(400).json({ message: "Patient Not found " });
    }
    // Validate Password
    const isPasswordValid = await bycrypt.compare(
      req.body.password,
      patient.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate user object
    const patientObject = { patientId: patient._id, name: patient.patientName };

    // Generate JWT token
    const token = jwt.sign({ patientId: patientObject.patientId }, jwtSecret, {
      expiresIn: "1h",
    });

    // Result token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ messgae: "Server error" });
  }
});

// Middleware to verify jWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.patientId = decoded.patientId;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token invalid" });
  }
};

// Profile route
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.patientId).select("-password"); // Exclude the password field
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Serve static files from the 'files' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Access the port Number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
