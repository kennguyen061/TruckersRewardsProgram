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

// access cart of a user
router.get("/", (request, response) => {
  console.log("Hit user cart");
  db.query(
    "SELECT * FROM CARTITEM WHERE UID = ? AND SID = ?",
    [request.params.UID, request.params.SID],
    (error, result) => {
      if (error) throw error;
      console.log("All cart items retrieved.");
      response.send(result);
    }
  );
});

// Add a cart item    
// TODO make some conditional that checks if the driver already has that item on the cart, if they do, increase the quantity by 1
router.post("/update", (request, response) => {
  console.log("Hit update");
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
      response.send(true);
    }
  );
});

// increasequantity
router.post("/increasequantity", (request, response) => {
  //calculate new quantity
  console.log("Hit increase quantity");
  let currentquantity = 0;
  db.query(
    "SELECT Quantity FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?",
    [UID, SID, ItemID],
    (error, result) => {
      if (error) throw error;
      currentquantity = result[0].Quantity;
    }
  );
  let newQuantity = currentquantity + 1;
  db.query(
    "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
    [newQuantity, request.body.UID, request.body.SID, request.body.ItemID],
    (error, result) => {
      if (error) throw error;
      console.log("Cart updated");
      response.send(true);
    }
  );
});

// decreasequantity
router.post("/decreasequantity", (request, response) => {
  console.log("Hit update");
  //calculate new quantity
  let currentquantity = 0;
  db.query(
    "SELECT Quantity FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?",
    [UID, SID, ItemID],
    (error, result) => {
      if (error) throw error;
      currentquantity = result[0].Quantity;
    }
  );
  let newQuantity = currentquantity - 1;
  db.query(
    "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
    [newQuantity, UID, SID, ItemID],
    (error, result) => {
      if (error) throw error;
      console.log("Cart updated");
      response.send(true);
    }
  );
});

//notify cart
router.post("/notifycart", (request, response) => {
  console.log("Hit notify cart");
  //1 for uid and sid are placeholder
  db.query(
    "SELECT * FROM CARTITEM WHERE UID = ? AND SID = ? AND ITEMID = ?;",
    [request.body.UID, request.body.SID, request.body.ItemID],
    (error, result) => {
      if (error) throw error;
      if (result.length >= 1) {
        // if they do, increase the quantity by 1 of the current entry (UPDATE)
        //1 for uid and sid are placeholder
        //Retrieve old quantity (3rd index in table), increase it by one
        let newquantity = result[0].Quantity + 1;
        db.query(
          "UPDATE CARTITEM SET Quantity = ? WHERE ItemID = ? AND UID = ? AND SID = ?",
          [
            newquantity,
            request.body.ItemID,
            request.body.UID,
            request.body.SID,
          ],
          (error, result) => {
            if (error) throw error;
          }
        );
      } else {
        //If not, create an entry with the item. (quantity 1) (INSERT INTO)
        //1 for uid and sid are placeholder
        db.query(
          "INSERT INTO CARTITEM(ItemID, ItemName, Price, Quantity, UID, SID) VALUES(?,?,?,1,?,?);",
          [
            request.body.ItemID,
            request.body.ItemName,
            request.body.Price,
            request.body.UID,
            request.body.SID,
          ],
          (error, result) => {
            if (error) throw error;
            response.send(true);
          }
        );
      }
    }
  );
});

// remove cart item
router.post("/remove", (request, response) => {
  console.log("Hit remove");
  db.query(
    "DELETE FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?",
    [request.body.UID, request.body.SID, request.body.ItemID],
    (error, result) => {
      if (error) throw error;
      console.log("Cart item removed.");
      response.send(true);
    }
  );
});

module.exports = router;
