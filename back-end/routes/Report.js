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

router.get("/SponsorName", (req, res) => {
  console.log("Getting sponsor names");

  db.query(
    "SELECT name FROM SPONSORORG WHERE SID = ?;",
    [req.query.sid],
    (err, result) => {
      console.log(result);
      if (err) {
        //do stuff
      } else {
        if (result.length != 0) {
          const name = result[0].name;
          res.send(JSON.stringify(name));
        } else {
          console.log(length != 0);
          res.send(false);
        }
      }
    }
  );
  console.log("hit end");
});

router.get("/boughtDESC", (req, res) => {
  db.query(
    "SELECT ItemName, COUNT(*) AS Count FROM ITEM GROUP BY ItemID ORDER BY COUNT(*) DESC;",
    [],
    (err, results) => {
      if (err) {
        console.log("Problem getting itms desc");
        res.send(false);
      } else {
        res.send(JSON.stringify(results));
      }
    }
  );
});

router.get("/boughtASC", (req, res) => {
  db.query(
    "SELECT ItemName, COUNT(*) AS Count FROM ITEM GROUP BY ItemID ORDER BY COUNT(*) ASC;",
    [],
    (err, results) => {
      if (err) {
        console.log("Problem getting itms ASC");
        res.send(false);
      } else {
        res.send(JSON.stringify(results));
      }
    }
  );
});

router.get("/sponsorLoginAttempts", (req, res) => {
  db.query(
    "SELECT r.Username, r.Login_date, r.Status FROM LOGINATTEMPTS r JOIN DRIVER d ON d.Email = r.Username JOIN SPONSORANDDRIVER s ON s.UID = d.UId WHERE s.SID = ?;",
    [req.query.SID],
    (err, results) => {
      if (err) {
        console.log("problem getting login info");
        res.send(false);
      } else {
        res.send(JSON.stringify(results));
      }
    }
  );
});

module.exports = router;
