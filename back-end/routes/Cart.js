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
    "SELECT * FROM CARTITEM WHERE UID = ? AND SID = ?;",
    [request.query.UID, request.query.SID],
    (error, result) => {
      let rbArray = Array();
      if (error) {
        throw error;
      } else {
        //responsebody array
        //loop through result[index]
        for (const element of result) {
          console.log(element.ItemID);
          let responseBody = {
            ItemID: null,
            ItemName: null,
            Price: null,
            Quantity: null,
            Availability: null,
            UID: null,
            SID: null,
          };

          responseBody.ItemID = element.ItemID;
          responseBody.ItemName = element.ItemName;
          responseBody.Price = element.Price;
          responseBody.Quantity = element.Quantity;
          responseBody.Availability = element.Availability;
          responseBody.UID = element.UID;
          responseBody.SID = element.SID;
          console.log(responseBody);
          rbArray.push(responseBody);
        }
        console.log(rbArray);
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
    "INSERT INTO CARTITEM(ItemID,UID,SID,ItemName,Price,Quantity,Availability) VALUES(?,?,?,?,?,?,?);",
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
    "SELECT Quantity FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?;",
    [request.body.UID, request.body.SID, request.body.ItemID],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        currentquantity = result[0].Quantity;
        let newQuantity = currentquantity + 1;

        console.log(newQuantity);
        db.query(
          "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?;",
          [
            newQuantity,
            request.body.UID,
            request.body.SID,
            request.body.ItemID,
          ],
          (error, result) => {
            if (error) throw error;
            console.log("Cart updated");
            response.send(true);
          }
        );
      }
    }
  );
});

// decreasequantity
router.post("/decreasequantity", (request, response) => {
  console.log("Hit update");
  //calculate new quantity
  let currentquantity = 0;
  db.query(
    "SELECT Quantity FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?;",
    [request.body.UID, request.body.SID, request.body.ItemID],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        currentquantity = result[0].Quantity;
        let newQuantity = currentquantity - 1;
        db.query(
          "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?;",
          [
            newQuantity,
            request.body.UID,
            request.body.SID,
            request.body.ItemID,
          ],
          (error, result) => {
            if (error) throw error;
            console.log("Cart updated");
            response.send(true);
          }
        );
      }
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
          "UPDATE CARTITEM SET Quantity = ? WHERE ItemID = ? AND UID = ? AND SID = ?;",
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
    "DELETE FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?;",
    [request.body.UID, request.body.SID, request.body.ItemID],
    (error, result) => {
      if (error) {
        console.log("that item wasnt here");
        response.send(false);
      }
      console.log("Cart item removed.");
      response.send(true);
    }
  );
});

//checkout (adds all cart items to order and ITEM if there is enough points, clears cart and subtracts order's points)
router.post("/checkout", (request, response) => {
  console.log("Hit checkout");
  db.query(
    "SELECT COUNT(*) AS RowCount FROM CARTITEM WHERE UID = ? AND SID = ?;",
    [request.body.UID,request.body.SID],
    (Err, Res) => {
      if (Res[0].RowCount === 0) {
        response.send(false);
        console.log("EMPTY CART");
      }
      else {

        let total = 0;
        db.query("SELECT Amount FROM POINTBALANCE WHERE UID = ? AND SID = ?",
        [request.body.UID,request.body.SID],
        (error,result) => {
          if(result.length === 0) {
            console.log("NO AMOUNT");
            response.send(false);
          }
          else {
            let newpointbalance = result[0].Amount;
            //CREATE A NEW ORDER BASED OFF request.body.UID, request.body.SID, Orderdate, request.body.address ADD ALL CARTITEMS TO ITEM (foreign key of the ORDER BASED OFF THE THREE) 
            db.query(
                    "SELECT Price FROM CARTITEM WHERE UID = ? AND SID = ?;",
                    [request.body.UID, request.body.SID],
                    (error2, result2) => {
                      if (error) {
                        throw error2;
                      } else {
                        //responsebody array
                        //loop through result[index]
                        for (const element of result2) {                
                          total = total + element.Price;
                        }
                    }
                    console.log("Total:" +total);
            
            if(result[0].Amount < total) {
                console.log("Insufficient points");
                //response.send(False);
            }
            else {
                db.query(
                    "INSERT INTO ORDERS(Total,UID,SID,Orderdate,Address,Orderstatus) VALUES(?,?,?,CURRENT_TIMESTAMP(),?,?);",
                    [
                      total,
                      request.body.UID,
                      request.body.SID,
                      request.body.address,
                      "In Progress"
                    ],
                    (error, result) => {
                      if (error) throw error;
                      console.log("Order created");
                      console.log("Result id: " + result.insertId);
                      //TODO: INSERT CATALOGITEMS INTO THE ITEM TABLE, find OrderID  
                      let rbArray = Array();
                      db.query(
                        "SELECT ItemName, Quantity, Price FROM CARTITEM WHERE UID = ? AND SID = ?;",
                        [request.body.UID, request.body.SID],
                        (error2, result2) => {
                          if (error2) {
                            throw error2;
                          } else {
                            //responsebody array
                            //loop through result[index]
                            for (const element of result2) {
                              let responseBody = {
                                ItemName: null,
                                Quantity: null,
                                Price: null,
                              };
                              
                              responseBody.ItemName = element.ItemName;
                              responseBody.Price = element.Price;
                              responseBody.Quantity = element.Quantity;
                              console.log(responseBody);
                              rbArray.push(responseBody);
                            }
                            console.log(rbArray);
                            console.log("rbArray.length: " + rbArray.length)
                            for(const element of rbArray) {
                              db.query(
                                "INSERT INTO ITEM(ItemName,OrderID,Quantity,Price) VALUES(?,?,?,?);",
                                [
                                  element.ItemName,
                                  result.insertId,
                                  element.Quantity,
                                  element.Price,
                                ],
                                (error3, result3) => {
                                  if (error3) throw error3;
                                  console.log("ITEM ADDED TO ORDER");
                                }
                              ); 
                            }
                          }
                        }
                      );
                      //DELETE ALL CARTITEMS FOR A UID AND SID
                      db.query(
                      "DELETE FROM CARTITEM WHERE UID = ? AND SID = ?;",
                      [request.body.UID, request.body.SID],
                      (error, result) => {
                        console.log("Cart items removed for Order.");
                      }
                    );
                    }
                  );
                db.query("UPDATE POINTBALANCE SET Amount = ? WHERE UID = ? AND SID = ?;",
                [
                    newpointbalance-total,
                    request.body.UID,
                    request.body.SID,
                ],
                (error,result) => {
                    console.log("Point balance updated")
                }
                );
            }
            });            
          }
        });
      }
    });
});

// access orders of a user
router.get("/driverorders", (request, response) => {
  console.log("Hit driver orders");

  db.query(
    "SELECT * FROM ORDERS WHERE UID = ? AND SID = ?;",
    [request.query.UID, request.query.SID],
    (error, result) => {
      let rbArray = Array();
      if (error) {
        throw error;
      } else {
        //responsebody array
        //loop through result[index]
        for (const element of result) {
          let responseBody = {
            OrderID: null,
            Total: null,
            OrderDate: null,
            Address: null,
            Orderstatus: null,
          };

          responseBody.OrderID = element.OrderID;
          responseBody.Total = element.Total;
          responseBody.OrderDate = element.OrderDate;
          responseBody.Address = element.Address;
          responseBody.Orderstatus = element.Orderstatus;
          console.log(responseBody);
          rbArray.push(responseBody);
        }
        console.log(rbArray);
        response.send(JSON.stringify(rbArray));
      }
    }
  );
});

module.exports = router;
