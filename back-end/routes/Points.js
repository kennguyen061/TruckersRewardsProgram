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

// access points
router.get("/", (request, response) => {
  console.log("Hit access points");
  db.query(
    "SELECT Amount FROM POINTBALANCE WHERE UID = ? AND SID = ?;",
    [request.query.UID, request.query.SID],
    (error, result) => {
      if (error) throw error;
      if (result.length > 0) {
        console.log("Points accessed.");
        response.send(JSON.stringify(result[0].Amount));
      }
    }
  );
});

//Point math needs to be done on the client side and the new total should be sent
// update points
router.post("/update", (request, response) => {
  console.log("Hit update points");

  let pointId = 0;

  // select point ID
  db.query(
    "SELECT PointID FROM POINTBALANCE WHERE UID = ? AND SID = ?;",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) {
        console.log("Something went wrong getting pointid");
        response.send(false);
      } else if (result.length > 0) {
        pointId = result[0].PointID;
        // new balance
        db.query(
          "UPDATE POINTBALANCE SET Amount = ? WHERE PointID = ?;",
          [request.body.newAmount, pointId],
          (err) => {
            if (err) {
              console.log("problem updating balance");
              request.send(false);
            } else {
              // log new balance
              db.query(
                "INSERT INTO POINTBALANCELOG(Point_Update,Update_Status,PointDate,PointID,SID) VALUES (?,?,CURRENT_TIMESTAMP(),?,?);",
                [
                  request.body.newAmount,
                  request.body.reason,
                  pointId,
                  request.body.SID,
                ],
                (err2) => {
                  if (err2) {
                    console.log("prob with points log");
                  } else {
                    response.send(true);
                  }
                }
              );
            }
          }
        );
      } else {
        response.send(false);
      }
    }
  );
});

// get point history
router.get("/history", (request, response) => {
  let pointId;

  // select point id
  db.query(
    "SELECT PointID FROM POINTBALANCE WHERE UID = ? AND SID = ?;",
    [request.query.UID, request.query.SID],
    (error, result) => {
      if (error) {
        throw error;
      } else if (result.length == 0) {
        response.send(false);
      } else {
        pointId = result[0].PointID;

        // get point history
        db.query(
          "SELECT * FROM POINTBALANCELOG WHERE PointID = ? AND SID = ?;",
          [pointId, request.query.SID],
          (err, res) => {
            if (error) {
              throw err;
            } else if (res.length == 0) {
              response.send(false);
            } else {
              response.send(JSON.stringify(res));
            }
          }
        );
      }
    }
  );
});

module.exports = router;
