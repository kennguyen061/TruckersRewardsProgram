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

/*
 * Only work on this once everything is done
 *
 *
 */

// access wish list
router.get("/", (request, response) => {
  console.log("Hit access wishlist");
  db.query(
    "SELECT * FROM DRIVERWISHLIST WHERE WishlistID = ?",
    [request.params.WishlistID],
    (error, result) => {
      if (error) throw error;
      console.log("Wish list retrieved.");
      response.send(result);
    }
  );
});

// update wish list
router.post("/update", (request, response) => {
  console.log("Hit update wishlist");
  db.query(
    "INSERT INTO WISHLISTITEM(WishlistID, ItemName, Cost) VALUES(?,?,?)",
    [request.body.WishlistID, request.body.ItemName, request.body.Cost],
    (error, result) => {
      if (error) throw error;
      console.log("Wish list updated.");
    }
  );
});

// remove wish list item
router.post("/remove", (request, response) => {
  console.log("Hit remove wishlist");
  db.query(
    "DELETE FROM WISHLISTITEM WHERE WishlistID = ? AND ItemName = ?",
    [request.body.WishlistID, request.body.ItemName],
    (error, result) => {
      if (error) throw error;
      console.log("Wish list item removed.");
    }
  );
});

module.exports = router;
