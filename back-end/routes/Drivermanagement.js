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
  console.log("Hit view drivers");
  db.query(
    "SELECT First_name,Last_name,Email,Address,Phone_number FROM DRIVER INNER JOIN SPONSORANDDRIVER ON SPONSORANDDRIVER.UID = DRIVER.UID WHERE SID = ?",
    [request.params.SID],
    (error, result) => {
      if (error) throw error;
      console.log("All sponsor drivers retrieved.");
      response.send(result);
    }
  );
});

// view specific driver of a sponsor
router.get("/viewdriver", (request, response) => {
  console.log("Hit view specific driver");
  db.query(
    "SELECT First_name,Last_name,Email,Address,Phone_number FROM DRIVER INNER JOIN SPONSORANDDRIVER ON SPONSORANDDRIVER.UID = DRIVER.UID WHERE SID = ? AND DRIVER.UID = ?",
    [request.params.SID, request.params.UID],
    (error, result) => {
      if (error) throw error;
      console.log("sponsor driver retrieved.");
      response.send(result);
    }
  );
});

// view driver points of a sponsor
router.get("/viewdriverpoints", (request, response) => {
  console.log("Hit driver points");
  db.query(
    "SELECT Amount FROM POINTBALANCE WHERE UID = ? AND SID = ?",
    [request.params.UID, request.params.SID],
    (error, result) => {
      if (error) throw error;
      console.log("Points retrieved.");
      response.send(result);
    }
  );
});

//view all orders of a driver
router.get("/viewdriverorders", (request, response) => {
  console.log("Hit driver orders");
  let responseBody = {
    OrderID: "",
    UID: "",
    SID: "",
    Orderdate: "",
    Address: "",
  };
  db.query(
    "SELECT * FROM ORDERS WHERE UID = ? AND SID = ?",
    [request.query.UID, request.query.SID],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        //responsebody array
        let rbArray = Array(result.length);
        //loop through result[index]
        for (const element of result) {
          responseBody.OrderID = element.OrderID,
          responseBody.UID = element.UID,
          responseBody.SID = element.SID,
          responseBody.Orderdate = element.Orderdate,
          responseBody.Address = element.Address,
          rbArray.push(responseBody);
        }
        response.send(JSON.stringify(rbArray));
      }
    }
  );
});
// removedriver
router.post("/removedriver", (request, response) => {
  console.log("Hit remove");
  db.query(
    "DELETE FROM SPONSORANDDRIVER WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
    }
  );
  db.query(
    "DELETE FROM DRIVERWISHLIST WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
    }
  );
  db.query(
    "DELETE FROM POINTBALANCE WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
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
  console.log("Hit change points scale");
  db.query(
    "UPDATE SPONSORORG SET conversion_scale = ? WHERE SID = ?;",
    [request.body.conversion_scale, request.body.SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
});

module.exports = router;
