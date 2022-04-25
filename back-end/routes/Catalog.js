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
router.post("/delete-all", (request, response) => {
  db.query(
    "DELETE FROM SPONSORLISTINGS WHERE SID = ?;",
    [request.body.sid],
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
router.post("/add-list-item", (request, response) => {
  db.query(
    "INSERT INTO SPONSORLISTINGS (ListingID, Title, Price, Quantity, Description, ImageURL, SID) VALUES (?, ?, ?, ?, ?, ?,?);",
    [
      request.body.listID,
      request.body.title,
      request.body.price,
      request.body.quantity,
      request.body.description,
      request.body.ImageURL,
      request.body.sid,
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

// get list items
router.get("/get-list-items", (request, response) => {
  db.query(
    "SELECT ListingID, Title, Price, Quantity, Description, ImageURL FROM SPONSORLISTINGS WHERE SID = ?;",
    [request.query.sid],
    (error, result) => {
      if (error) {
        console.log("ERROR selecting from SPONSORLISTINGS");
      } else {
        //responsebody array
        //loop through result[index]
        let rbArray = Array();
        for (const element of result) {
          console.log(element.ListingID);
          let responseBody = {
            ListingID: null,
            Title: null,
            Price: null,
            Quantity: null,
            Description: null,
            ImageURL: null,
          };

          responseBody.ListingID = element.ListingID;
          responseBody.Title = element.Title;
          responseBody.Price = element.Price;
          responseBody.Quantity = element.Quantity;
          responseBody.Description = element.Description;
          responseBody.ImageURL = element.ImageURL;
          rbArray.push(responseBody);
        }
        response.send(JSON.stringify(rbArray));
      }
    }
  );
});

module.exports = router;
