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

// delete all listing
router.post('/delete-all', (request, response) => {
    db.query("DELETE FROM SPONSORLISTINGS WHERE SID = ?;",
        [
            request.body.sid
        ],
        (error) => {
            if (error) {
                console.log("ERROR deleting from SPONSORLISTINGS");
            } else {
                response.send(true);
            }
        }
    );
});

// add list item
router.post('/add-list-item', (request, response) => {
    db.query("INSERT INTO SPONSORLISTINGS (ListingID, Title, Price, Quantity, Description, SID)) VALUES (?, ?, ?, ?, ?, ?);",
        [
            request.body.listID,
            request.body.title,
            request.body.price,
            request.body.quantity,
            request.body.description,
            request.body.sid
        ],
        (error, result) => {
            if (error) {
                console.log("ERROR inserting into SPONSORLISTINGS");
            } else if (result.affectedRows == 0) {
                response.send(false);
            } else {
                response.send(true);
            }
        }
    );
});



//update catalog rules
router.post("/updatecatalogrules", (request, response) => {
  console.log("Hit update cart rules");
  console.log(request.body);
  db.query(
    "UPDATE SPONSORORG SET Catalog_rules = ? WHERE SID = ?;",
    [request.body.rules, request.body.SID],
    (error, result) => {
      console.log("request made");
      if (error) throw error;
      if (result.affectedRows == 1) {
        console.log("true");
        response.send(true);
      } else {
        console.log("false");
        response.send(false);
      }
    }
  );
});

// read catalog rules
router.get("/getcatalogrules", (request, response) => {
  console.log("Hit get cat rules");
  db.query(
    "SELECT Catalog_rules FROM SPONSORORG WHERE SID = ?;",
    [request.query.SID],
    (error, result) => {
      if (error) throw error;
      if (result.length == 1) {
        response.send(JSON.stringify(result[0]));
      } else {
        response.send(JSON.stringify(null));
      }
    }
  );
});

module.exports = router;
