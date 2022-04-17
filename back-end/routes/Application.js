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

router.post("/createApplication", (request, response) => {
  // check if application already exists
  db.query(
    "SELECT COUNT(*) FROM APPLICATION WHERE UID = ? AND SID = ?;",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      if (result == 1) response.send(false);
    }
  );
  //Creates the new application
  db.query(
    "INSERT INTO APPLICATION(UID,SID,Appstatus,Appdate) VALUES(?,?,'InProgress',CURRENT_TIMESTAMP()",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
});

// driver delete application
router.post("/deleteapplication", (request, response) => {
  db.query(
    "DELETE FROM APPLICATION WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
});

// approve application
router.post("/approveapplication", (request, response) => {
  db.query(
    "UPDATE APPLICATION SET Appstatus = 'Approved' WHERE UID = ? AND SID = ?",
    [response.body.UID, response.body.SID],
    (error, result) => {
      if (error) throw error;
    }
  );
  //Creates a new point and wishlist record after application approval
  db.query(
    "INSERT INTO DRIVERWISHLIST(UID,SID) VALUES(?,?)",
    [response.body.UID, response.body.SID],
    (error, result) => {
      if (error) throw error;
    }
  );
  db.query(
    "INSERT INTO POINTBALANCE(UID,SID,Amount) VALUES(?,?,0)",
    [response.body.UID, response.body.SID],
    (error, result) => {
      if (error) throw error;
    }
  );
  db.query(
    "INSERT INTO SPONSORANDDRIVER(UID,SID) VALUES(?,?)",
    [response.body.UID, response.body.SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
});

// update account
router.post("/rejectapplication", (request, response) => {
  db.query(
    "UPDATE APPLICATION SET Appstatus = 'Rejected', Reason = ? WHERE UID = ? AND SID = ?",
    [Reason, UID, SID],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
});

// read specific application
router.get("/retrieveapplication", (request, response) => {
  db.query(
    "SELECT * FROM APPLICATION WHERE UID = ? AND SID = ?",
    [request.params.UID, request.params.SID],
    (error, result) => {
      if (error) throw error;
      response.send(JSON.stringify(result));
    }
  );
});

// read specific application
router.get("/retrievealluserapplications", (request, response) => {
  db.query(
    "SELECT * FROM APPLICATION WHERE UID = ?",
    [request.params.UID],
    (error, result) => {
      if (error) throw error;
      response.send(JSON.stringify(result));
    }
  );
});

// read specific application
router.get("/retrieveallsponsorapplications", (request, response) => {
  db.query(
    "SELECT * FROM APPLICATION WHERE SID = ?",
    [request.params.SID],
    (error, result) => {
      if (error) throw error;
      response.send(JSON.stringify(result));
    }
  );
});

module.exports = router;
