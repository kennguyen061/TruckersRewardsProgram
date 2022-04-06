const router = require("express").Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// specify database
const db = mysql.createConnection({
  host: "database-1.cy0nrpgxkpzk.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "test1337froggang",
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
    "INSERT INTO CARTITEM(UID,SID,ItemName,Price,Quantity) VALUES(?,?,?,?,?)",
    [request.body.UID, request.body.SID, request.body.ItemName, request.body.Price, request.body.Quantity],
    (error, result) => {
      if (error) throw error;
      console.log("Cart updated");
    }
  );
});

// remove wish list item
router.post("/remove", (request, response) => {
  db.query(
    "DELETE FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemName = ?",
    [request.body.UID, request.body.SID,request.body.ItemName],
    (error, result) => {
      if (error) throw error;
      console.log("Cart item removed.");
    }
  );
});

//Gets the current quantity (used for changequantity function so I dont have to make add quantity and subtract quantity
const getquantity = (UID, SID, ItemID) => {
  db.query(
    "SELECT Quantity FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?",
    [UID, SID, ItemID],
    (error, result) => {
      if (error) throw error;
      return result[0].Quantity;
    }
  );
};

function addquantity(UID, SID, ItemID) {
  //calculate new quantity
  currentquantity = getquantity(UID, SID, ItemID);
  newQuantity = currentquantity + 1;
  db.query(
    "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
    [newQuantity, UID, SID, ItemID],
    (error, result) => {
      if (error) throw error;
    }
  );
}

function lowerquantity(UID, SID, ItemID) {
  //calculate new quantity
  currentquantity = getquantity(UID, SID, ItemID);
  newQuantity = currentquantity - 1;
  db.query(
    "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
    [newQuantity, UID, SID, ItemID],
    (error, result) => {
      if (error) throw error;
    }
  );
}
module.exports = router;
