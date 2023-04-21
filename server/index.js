// server/index.js

import express from 'express';
import mysql from "mysql";
import cors from "cors";
const PORT = process.env.PORT || 2000;


const app = express();
app.use(cors())
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mta_dashboard"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});


app.get("/distinct_jurisdictions", (req, res) => {
  const q = "SELECT DISTINCT jurisdiction from systems_diagnostic_report";
    db.query(q, (err,data)=>{
    if (err) return res.json(err)
    console.log("data from /distinct_jurisdictions:", data)
    return res.json(data)
  })
})
app.get("/system_diagnostic_report", (req, res) => {
  
  var last_used = req.query.last_used
  console.log(last_used)
  const q = `SELECT * from systems_diagnostic_report WHERE last_used = "${last_used}" GROUP BY vehicleId `;
  console.log(q);
  db.query(q, (err,data)=>{
    if (err) return res.json(err)
    console.log("data", data)
    return res.json(data)
  })
})

app.get("/scrap_buses", (req, res) => {
  const q = "SELECT * from scrap_buses";
  db.query(q, (err,data)=>{
    if (err) return res.json(err)
    // console.log("data", data)
    return res.json(data)
  })
})

app.get("/tsp_eligibility", (req, res) => {
  const q = "SELECT * from tsp_eligibility";
  db.query(q, (err,data)=>{
    if (err) return res.json(err)
    console.log("data", data)
    return res.json(data)
  })
})

app.get("/fetch_count_by_jurisdiction", (req,res) => {
  const jurisdiction = req.query.jurisdiction;
  console.log("jurisdiction", jurisdiction)
  const q = `SELECT last_used, COUNT(*) AS 'num' FROM systems_diagnostic_report WHERE jurisdiction = '${jurisdiction}' GROUP BY last_used`
  console.log(q);
  db.query(q, (err,data) =>{
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.get("/tsp_eligibility-distinct_garage_name", (req, res) => {
  const q = 'SELECT COUNT(*) as count, garage_name from tsp_eligibility GROUP BY garage_name';
  db.query(q, (err,data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!"});
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});