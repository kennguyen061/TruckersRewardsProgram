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

// get reportable accounts
router.get("/", (request, respsonse) => {
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
    //if this sends here then an error is made by the call at the end
    //respsonse.send(responseBody);
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

    respsonse.send(responseBody);
  }
});

module.exports = router;
