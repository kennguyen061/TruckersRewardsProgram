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

module.exports = router;
