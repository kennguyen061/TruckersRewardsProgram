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
});

/*
 * Only work on this once everything is done
 *
 *
 */

// get reportable accounts
router.get("/", (request, respsonse) => {
  console.log("Hit get all accounts");

  let responseBody = {
    driverAccounts: null,
    sponsorAccounts: null,
  };

  if (request.params.role == "SPONSORACCT") {
    db.query(
      "SELECT UID, First_name, Last_name Password_hash, Password_salt FROM DRIVER;",
      (error, result) => {
        if (error) throw error;
        responseBody.driverAccounts = result;
      }
    );
  }

  if (request.params.role == "ADMIN") {
    db.query(
      "SELECT UID, First_name, Last_name Password_hash, Password_salt FROM DRIVER;",
      (error, result) => {
        if (error) throw error;
        responseBody.driverAccounts = result;
      }
    );

    db.query(
      "SELECT SUID, First_name, Last_name Password_hash, Password_salt FROM SPONSORACCT;",
      (error, result) => {
        if (error) throw error;
        responseBody.sponsorAccounts = result;
      }
    );
  }

  respsonse.send(responseBody);
});

router.get("/SponsorName", (req, res) => {
  console.log("Getting sponsor names");

  db.query(
    "SELECT name FROM SPONSORORG WHERE SID = ?;",
    [req.query.sid],
    (err, result) => {
      if (err) {
        //do stuff
      } else {
        if (result.length != 0) {
          const name = result[0].name;
          res.send(name);
        } else {
          console.log(length != 0);
          res.send(false);
        }
      }
    }
  );
  console.log("hit end");
});

module.exports = router;
