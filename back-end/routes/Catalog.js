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

//update catalog rules
router.post("/updatecatalogrules", (request, response) => {
  console.log("Hit update cat rules");
  db.query(
    "UPDATE SPONSORORG SET Catalog_rules = ? WHERE SID = ?;",
    [request.body.rules, request.body.SID],
    (error, result) => {
      if (error) throw error;
      if (result.affectedRows == 1) {
        response.send(true);
      } else {
        response.send(false);
      }
    }
  );
});

// read catalog rules
router.get("/getcatalogrules", (request, response) => {
  console.log("Hit get cat rules");
  db.query(
    "SELECT Catalog_rules FROM SPONSORORG WHERE SID = ?;",
    [request.query.SID],
    (error, result) => {
      if (error) throw error;
      if (result.length == 1) {
        response.send(JSON.stringify(result[0]));
      } else {
        response.send(JSON.stringify(null));
      }
    }
  );
});

module.exports = router;
