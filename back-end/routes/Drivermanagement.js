const router = require("express").Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// view all drivers of a sponsor TODO:
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

module.exports = router;