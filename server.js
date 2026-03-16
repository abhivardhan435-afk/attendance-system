const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* Database Connection */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "attendance"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

/* Default Route */

app.get("/", (req, res) => {
  res.send("Cloud Attendance System API Running");
});

/* Login API */

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.json({ success: true, message: "Login Successful" });
  } else {
    res.json({ success: false, message: "Invalid Credentials" });
  }

});

/* Add Student */

app.post("/add-student", (req, res) => {

  const { id, name, course, institution_id } = req.body;

  const sql = "INSERT INTO students (id, name, course, institution_id) VALUES (?,?,?,?)";

  db.query(sql, [id, name, course, institution_id], (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.send("Student Added Successfully");
    }

  });

});

/* Get Students */

app.get("/students", (req, res) => {

  db.query("SELECT * FROM students", (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }

  });

});

/* Mark Attendance */

app.post("/mark-attendance", (req, res) => {

  const { student_id, date, status } = req.body;

  const sql = "INSERT INTO attendance (student_id, date, status) VALUES (?,?,?)";

  db.query(sql, [student_id, date, status], (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.send("Attendance Marked");
    }

  });

});

/* View Attendance */

app.get("/attendance", (req, res) => {

  db.query("SELECT * FROM attendance", (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }

  });

});

/* Server */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
