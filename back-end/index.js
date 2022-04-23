const express = require("express");
const cors = require("cors");
const accountRoute = require("./routes/Account");
const pointsRoute = require("./routes/Points");
const wishListRoute = require("./routes/WishList");
const cartRoute = require("./routes/Cart");
const drivermgtRoute = require("./routes/Drivermanagement");
const applicationRoute = require("./routes/Application");
const catalogRoute = require("./routes/Catalog");
const reportsRoute = require("./routes/Report");
const etsyRoute = require("./routes/Etsy");
const PORT = 8000;

const app = express();

app.use(cors({ origin: "*" }));
app.use("/account", accountRoute);
app.use("/points", pointsRoute);
app.use("/wishlist", wishListRoute);
app.use("/cart", cartRoute);
app.use("/drivermgt", drivermgtRoute);
app.use("/application", applicationRoute);
app.use("/catalog", catalogRoute);
app.use("/reports", reportsRoute);
app.use("/etsy", etsyRoute);
app.use(express.json({ limit: "40KB" }));
app.use(express.urlencoded({ limit: "40KB" }));

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
