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

// access cart of a user
router.get("/", (request, response) => {
  db.query(
    "SELECT * FROM CARTITEM WHERE UID = ? AND SID = ?",
    [request.body.UID, request.body.SID],
    (error, result) => {
      if (error) throw error;
      console.log("All cart items retrieved.");
      response.send(result);
    }
  );
});

// Add a cart item
router.post("/update", (request, response) => {
  db.query(
    "INSERT INTO CARTITEM(ItemID,UID,SID,ItemName,Price,Quantity) VALUES(?,?,?,?,?,?)",
    [
      request.body.ItemID,
      request.body.UID,
      request.body.SID,
      request.body.ItemName,
      request.body.Price,
      request.body.Quantity,
    ],
    (error, result) => {
      if (error) throw error;
      console.log("Cart updated");
    }
  );
});

// remove wish list item
router.post("/remove", (request, response) => {
  db.query(
    "DELETE FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?",
    [request.body.UID, request.body.SID, request.body.ItemID],
    (error, result) => {
      if (error) throw error;
      console.log("Cart item removed.");
    }
  );
});

// //Gets the current quantity
// const getquantity = (UID, SID, ItemID) => {
//   db.query(
//     "SELECT Quantity FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?",
//     [UID, SID, ItemID],
//     (error, result) => {
//       if (error) throw error;
//       return result[0].Quantity;
//     }
//   );
// };

// function addquantity(UID, SID, ItemID) {
//   //calculate new quantity
//   currentquantity = getquantity(UID, SID, ItemID);
//   newQuantity = currentquantity + 1;
//   db.query(
//     "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
//     [newQuantity, UID, SID, ItemID],
//     (error, result) => {
//       if (error) throw error;
//     }
//   );
// }

// function lowerquantity(UID, SID, ItemID) {
//   //calculate new quantity
//   currentquantity = getquantity(UID, SID, ItemID);
//   newQuantity = currentquantity - 1;
//   db.query(
//     "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
//     [newQuantity, UID, SID, ItemID],
//     (error, result) => {
//       if (error) throw error;
//     }
//   );
// }

module.exports = router;
