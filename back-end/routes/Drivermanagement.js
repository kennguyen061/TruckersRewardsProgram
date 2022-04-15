const router = require("express").Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "team1-db.cobd8enwsupz.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "y4PVPHuqVq52Pvp",
  database: "CPSC4910",
});

// view all drivers of a sponsor
router.get("/viewdrivers", (request, response) => {
  db.query(
    "SELECT First_name,Last_name,Email,Address,Phone_number FROM DRIVER INNER JOIN SPONSORANDDRIVER ON SPONSORANDDRIVER.UID = DRIVER.UID WHERE SID = ?",
    [request.body.SID],
    (error, result) => {
      if (error) throw error;
      console.log("All sponsor drivers retrieved.");
      response.send(result);
    }
  );
});

// view specific driver of a sponsor
router.get("/viewdriver", (request, response) => {
  db.query(
    "SELECT First_name,Last_name,Email,Address,Phone_number FROM DRIVER INNER JOIN SPONSORANDDRIVER ON SPONSORANDDRIVER.UID = DRIVER.UID WHERE SID = ? AND DRIVER.UID = ?",
    [request.body.SID, request.body.UID],
    (error, result) => {
      if (error) throw error;
      console.log("sponsor driver retrieved.");
      response.send(result);
    }
  );
});

// view driver points of a sponsor
router.get("/viewdriverpoints", (request, response) => {
  db.query(
    "SELECT Amount FROM POINTBALANCE WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      console.log("Points retrieved.");
      response.send(result);
    }
  );
});

//TODO: view all orders of a driver
router.get("/viewdriverorders", (request, response) => {
  db.query(
    "SELECT * FROM ORDERS WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      console.log("Orders retrieved.");
      response.send(result);
    }
  );
});
// removedriver
router.post("/removedriver", (request, response) => {
  db.query(
    "DELETE FROM SPONSORANDDRIVER WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
  db.query(
    "DELETE FROM DRIVERWISHLIST WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
  db.query(
    "DELETE FROM POINTBALANCE WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
  db.query(
    "DELETE FROM CARTITEM WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
});

// update conversion_scale
router.post("/changescale", (request, response) => {
  db.query(
    "UPDATE SPONSORORG SET conversion_scale = ? WHERE SID = ?;",
    [request.body.conversion_scale, request.body.SID],
    (error, result) => {
      if (error) throw error;
      console.log(result);
      updatePointBalanceLog(newPoints, Reason, PointID, SID);
    }
  );
});

module.exports = router;
