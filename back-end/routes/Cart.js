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
  let responseBody = {
    ItemID: null,
    ItemName: null,
    Price: null,
    Quantity: null,
    Availability: null,
    UID: null,
    SID: null,
  };
  db.query(
    "SELECT * FROM CARTITEM WHERE UID = 1 AND SID = 1",
    [request.query.UID, request.query.SID],
    (error, result) => {
      let rbArray = Array(result.length);
      if (error) {
        throw error;
      } else {
        //responsebody array
        //let rbArray = Array(result.length);
        //loop through result[index]
        for (const element of result) {
          responseBody.ItemID = element.ItemID;
          responseBody.ItemName = element.ItemName;
          responseBody.Price = element.Price;
          responseBody.Quantity = element.Quantity;
          responseBody.Availability = element.Availability;
          responseBody.UID = element.UID;
          responseBody.SID = element.SID;
          rbArray.push(responseBody);
        }
        response.send(JSON.stringify(rbArray));
      }
    }
  );
});

// Add a cart item
// TODO make some conditional that checks if the driver already has that item on the cart, if they do, increase the quantity by 1
router.post("/update", (request, response) => {
  console.log("Hit update");
  db.query(
    "INSERT INTO CARTITEM(ItemID,UID,SID,ItemName,Price,Quantity,Availability) VALUES(?,?,?,?,?,?,?)",
    [
      request.body.ItemID,
      request.body.UID,
      request.body.SID,
      request.body.ItemName,
      request.body.Price,
      request.body.Quantity,
      request.body.Availability,
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
    [request.body.UID, request.body.SID, request.body.ItemID],
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
    [request.body.UID, request.body.SID, request.body.ItemID],
    (error, result) => {
      if (error) throw error;
      currentquantity = result[0].Quantity;
    }
  );
  let newQuantity = currentquantity - 1;
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

//notify cart
router.post("/notifycart", (request, response) => {
  console.log("Hit notify cart");
  console.log(request.body);
  console.log("UID " + request.body.UID);
  console.log("SID " + request.body.SID);
  console.log("ItemId " + request.body.ItemID);
  //1 for uid and sid are placeholder
  db.query(
    "SELECT * FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?;",
    [request.body.UID, request.body.SID, request.body.ItemID],
    (error, result) => {
      console.log(result);
      if (error) throw error;
      if (result.length >= 1) {
        // if they do, increase the quantity by 1 of the current entry (UPDATE)
        //1 for uid and sid are placeholder
        //Retrieve old quantity (3rd index in table), increase it by one

        console.log("entered update");
        let newquantity = result[0].Quantity + 1;
        console.log(result[0]);
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
            response.send(true);
          }
        );
      } else {
        //If not, create an entry with the item. (quantity 1) (INSERT INTO)
        //1 for uid and sid are placeholder
        console.log(result[0]);
        db.query(
          "INSERT INTO CARTITEM(ItemID, ItemName, Price, Quantity, UID, SID,Availability) VALUES(?,?,?,?,?,?,?);",
          [
            request.body.ItemID,
            request.body.ItemName,
            request.body.Price,
            request.body.Quantity,
            request.body.UID,
            request.body.SID,
            request.body.Availability,
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
