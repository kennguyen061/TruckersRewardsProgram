const router = require("express").Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// specify database
const db = mysql.createConnection({
  host: "team1-db.cobd8enwsupz.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "y4PVPHuqVq52Pvp",
  database: "CPSC4910",
});

// connect to database
db.connect((error) => {
  if (error) throw error;
  console.log("Connected");
});

//update catalogrules
router.post("/updatecatalogrules", (request, response) => {
  db.query(
    "UPDATE SPONSORORG SET Catalog_rules = ? WHERE SID = ?;",
    [request.body.rulestring, request.body.SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
});

// read catalogrules
router.get("/getcatalogrules", (request, response) => {
  db.query(
    "SELECT Catalog_rules FROM SPONSORORG WHERE SID = ?",
    [request.params.SID],
    (error, result) => {
      if (error) throw error;
      response.send(JSON.stringify(result));
    }
  );
});

module.exports = router;
