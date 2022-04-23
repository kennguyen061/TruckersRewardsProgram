const router = require("express").Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const fetch = require("node-fetch");
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
  const url =
    "https://community-etsy.p.rapidapi.com/listings/active?includes=MainImage&limit=50&offset=0&api_key=dmmhikoeydunsffqrxyeubdv%22";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "community-etsy.p.rapidapi.com",
      "X-RapidAPI-Key": "b316ed0269mshc4c209e54250f24p10903cjsnd9b3711e8461",
    },
  };

  fetch(url, options)
    .then((res) => {
      console.log(res);
      res.json();
    })
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
});

module.exports = router;
