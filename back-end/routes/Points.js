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
});

// connect to database
db.connect((error) => {
  if (error) throw error;
  console.log("Connected");
});

// access points
router.get("/", (request, response) => {
  db.query(
    "SELECT Amount FROM POINTBALANCE WHERE PointID = ?;",
    [PointID],
    (error, result) => {
      if (error) throw error;
      if (result.length > 0) {
        console.log("Points accessed.");
        response.send(result[0].Amount);
      }
    }
  );
});

// update points
router.post("/update", (request, response) => {
  // select point ID
  db.query(
    "SELECT PointID FROM POINTBALANCE WHERE UID = ? AND SID = ?;",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      if (result.length > 0) {
        PointID = result[0].PointID;
      }
    }
  );

  // UPDATE new balance
  db.query(
    "UPDATE POINTBALANCE SET Amount = ? WHERE PointID = ?",
    [request.body.currentPoints, request.body.PointID],
    (error, result) => {
      if (error) throw error;
    }
  );
  // insert new balance into log
  db.query(
    "INSERT INTO POINTBALANCELOG(Point_Update,Update_Status,PointDate,PointID,SID) VALUES (?,?,CURRENT_TIMESTAMP(),?,?",
    [
      request.body.currentPoints,
      request.body.Reason,
      request.body.PointID,
      request.body.SID,
    ],
    (error, result) => {
      if (error) throw error;
    }
  );
});
module.exports = router;
