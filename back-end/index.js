const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const accountRoute = require("./routes/Account");
const pointsRoute = require("./routes/Points")
const wishListRoute = require("./routes/WishList")
const PORT = 8000;

// specify database
//const db = mysql.createConnection({
//    host: "database-1.cy0nrpgxkpzk.us-east-1.rds.amazonaws.com",
//    user: "admin",
//    password: "test1337froggang"
//});

// connect to database
//db.connect((error) => {
//    if (error) throw error;
//    console.log("Connected");
//});

const app = express();

app.use(cors({ origin: "*" }));
app.use("/account", accountRoute);
app.use("/points", pointsRoute);
app.use("/wishlist", wishListRoute);


app.listen(PORT, () => {
    console.log("Sever running on port " + PORT);
});