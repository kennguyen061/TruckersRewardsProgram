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

//Checks if two months have passed for an application, use before create application if one already exists of same UID and SID?
const checkapplicationtime = (UID, SID) => {
  db.query(
    "SELECT Appdate FROM Application WHERE UID = ? AND SID = ? AND CURRENT_TIMESTAMP() > (SELECT DATEADD(month,2,Appdate) FROM Application WHERE UID = ? AND SID = ?);",
    [UID, SID, UID, SID],
    (error, result) => {
      if (error) throw error;
      //if there is more than 1 result, then return true
      if (result.length >= 1) {
        return true;
      } else {
        return false;
      }
    }
  );
};

//Creates a new application, check 2 months
function createApplication(UID, SID) {
  db.query(
    "INSERT INTO APPLICATION(UID,SID,Appstatus,Appdate) VALUES(?,?,'InProgress',CURRENT_TIMESTAMP()",
    [UID, SID],
    (error, result) => {
      if (error) throw error;
    }
  );
}

//Used by drivers when cancelling applications
function deleteApplication(UID, SID) {
  db.query(
    "DELETE FROM APPLICATION WHERE UID = ? AND SID = ?",
    [UID, SID],
    (error, result) => {
      if (error) throw error;
    }
  );
}

//Sponsors/admins approving applications
function approveApplication(UID, SID) {
  db.query(
    "UPDATE APPLICATION SET Appstatus = 'Approved' WHERE UID = ? AND SID = ?",
    [UID, SID],
    (error, result) => {
      if (error) throw error;
    }
  );
  //Creates a new point and wishlist record after application approval
  db.query(
    "INSERT INTO DRIVERWISHLIST(UID,SID) VALUES(?,?)",
    [UID, SID],
    (error, result) => {
      if (error) throw error;
    }
  );
  db.query(
    "INSERT INTO POINTBALANCE(UID,SID,Amount) VALUES(?,?,0)",
    [UID, SID],
    (error, result) => {
      if (error) throw error;
    }
  );
  db.query(
    "INSERT INTO SPONSORANDDRIVER(UID,SID) VALUES(?,?)",
    [UID, SID],
    (error, result) => {
      if (error) throw error;
    }
  );
}

//Sponsors/admins rejecting applications with a reason
function rejectApplication(UID, SID, Reason) {
  db.query(
    "UPDATE APPLICATION SET Appstatus = 'Rejected', Reason = ? WHERE UID = ? AND SID = ?",
    [Reason, UID, SID],
    (error, result) => {
      if (error) throw error;
    }
  );
}

//Retrieves a specific application
const retrieveApplication = (UID, SID) => {
  db.query(
    "SELECT * FROM APPLICATION WHERE UID = ? AND SID = ?",
    [UID, SID],
    (error, result) => {
      if (error) throw error;
      return result;
    }
  );
};

//retrieve all applications of a user
const retrieveallUserApplications = (UID) => {
  db.query(
    "SELECT * FROM APPLICATION WHERE UID = ?",
    [UID],
    (error, result) => {
      if (error) throw error;
      return result;
    }
  );
};

//retrieve all user applications of a sponsor
const retrieveallSponsorApplications = (SID) => {
  db.query(
    "SELECT * FROM APPLICATION WHERE SID = ?",
    [SID],
    (error, result) => {
      if (error) throw error;
      return result;
    }
  );
};

module.exports = router;
