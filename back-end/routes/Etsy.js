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
});

// Etsy call
router.get("/", async (request, response) => {
  let url =
    "https://openapi.etsy.com/v2/listings/active?includes=MainImage&limit=50&offset=0&api_key=dmmhikoeydunsffqrxyeubdv";
  const responseBody = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
  });
  response.send(responseBody);
});
