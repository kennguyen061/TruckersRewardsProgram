const express = require("express");
const cors = require("cors");
const accountRoute = require("./routes/Account");
const pointsRoute = require("./routes/Points");
const wishListRoute = require("./routes/WishList");
//WIP
const applicationRoute = require("./routes/Application")
const cartRoute = require("./routes/Cart");
const PORT = 8000;

const app = express();

app.use(cors({ origin: "*" }));
app.use("/account", accountRoute);
app.use("/points", pointsRoute);
app.use("/wishlist", wishListRoute);
//These two are WIP
app.use("/application", applicationRoute);
app.use("/cart", cartRoute);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
