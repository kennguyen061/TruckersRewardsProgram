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

//Retrieves all cart items of a user
const retrievecart = (UID, SID) => {
  db.query(
    "SELECT * FROM CARTITEM WHERE UID = ? AND SID = ?",
    [UID, SID],
    (error, result) => {
      if (error) throw error;
      return result;
    }
  );
};

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

function addtocart(UID, SID, ItemName, Price, Quantity) {
  db.query(
    "INSERT INTO CARTITEM(UID,SID,ItemName,Price,Quantity) VALUES(?,?,?,?,?)",
    [UID, SID, ItemName, Price, Quantity],
    (error, result) => {
      if (error) throw error;
    }
  );
}

function removeitemfromcart(UID, SID, ItemName) {
  db.query(
    "DELETE FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemName = ?",
    [UID, SID, ItemName],
    (error, result) => {
      if (error) throw error;
    }
  );
}

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

function updateprice(UID, SID, ItemID, Price) {
  db.query(
    "UPDATE CARTITEM SET Price = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
    [Price, UID, SID, ItemID],
    (error, result) => {
      if (error) throw error;
    }
  );
}

function changename(UID, SID, ItemID, ItemName) {
  db.query(
    "UPDATE CARTITEM SET ItemName = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
    [ItemName, UID, SID, ItemID],
    (error, result) => {
      if (error) throw error;
    }
  );
}

module.exports = router;
