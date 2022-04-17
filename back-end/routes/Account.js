const router = require("express").Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const crypto = require("crypto");

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

// record login attempt
function loginAttempt(email, status) {
  db.query(
    "INSERT INTO LOGINATTEMPTS(Login_date, Username, Status) VALUES(CURRENT_TIMESTAMP(), ?, ?);",
    [email, status],
    (error) => {
      if (error) throw error;
    }
  );
}

// access account
router.post("/", (request, response) => {
  console.log("Hit login");
  let responseBody = {
    exists: false,
    id: null,
    role: null,
  };

  // check driver table
  db.query(
    "SELECT UID, Password_hash, Password_salt FROM DRIVER WHERE Email = ?;",
    [request.body.email],
    (error, result) => {
      if (error) throw error;
      if (result.length === 0) return;

      let salt = new Date(result[0].Password_salt).toISOString();

      let hash = crypto
        .createHash("sha256")
        .update(request.body.password + salt)
        .digest("base64");

      if (hash === result[0].Password_hash) {
        responseBody.exists = true;
        responseBody.id = result[0].UID;
        responseBody.role = "DRIVER";
      }

      if (responseBody.exists) {
        loginAttempt(request.body.email, "Success");
        response.send(responseBody);
        return;
      }
    }
  );

  // check sponsor table
  db.query(
    "SELECT Password_hash, Password_salt FROM SPONSORACCT WHERE Email = ?;",
    [request.body.email],
    (error, result) => {
      if (error) throw error;
      if (result.length === 0) return;

      let salt = new Date(result[0].Password_salt).toISOString();

      let hash = crypto
        .createHash("sha256")
        .update(request.body.password + salt)
        .digest("base64");

      if (hash === result[0].Password_hash) {
        responseBody.exists = true;
        responseBody.id = result[0].SUID;
        responseBody.role = "SPONSORACCT";
      }
      if (responseBody.exists) {
        loginAttempt(request.body.email, "Success");
        response.send(responseBody);
        return;
      }
    }
  );

  // check admin table
  db.query(
    "SELECT Password_hash, Password_salt FROM ADMIN WHERE Email = ?;",
    [request.body.email],
    (error, result) => {
      if (error) throw error;
      if (result.length === 0) return;

      let salt = new Date(result[0].Password_salt).toISOString();

      let hash = crypto
        .createHash("sha256")
        .update(request.body.password + salt)
        .digest("base64");

      if (hash === result[0].Password_hash) {
        responseBody.exists = true;
        responseBody.id = result[0].A_ID;
        responseBody.role = "ADMIN";
      }

      if (responseBody.exists) {
        loginAttempt(request.body.email, "Success");
        response.send(responseBody);
      }
    }
  );
  if (!responseBody.exists) {
    loginAttempt(request.body.email, "Failure");
    response.send(responseBody);
  }
});

// create account
router.post("/create", (request, response) => {
  console.log("Hit create sponsor subuser");
  // check if account already exists
  console.log("Hit accouint creation");
  let go = true;
  db.query(
    "SELECT COUNT(*) FROM DRIVER WHERE Email = ?;",
    [request.body.email],
    (error, result) => {
      if (error) throw error;
      if (result == 1) {
        go = false;
        response.send(false);
      }
    }
  );

  if (go) {
    // create hash and salt
    let salt = new Date().toISOString();

    let hash = crypto
      .createHash("sha256")
      .update(request.body.password + salt)
      .digest("base64");

    console.log("The creation hash is: " + hash);
    console.log("The creation salt is: " + salt);
    console.log("The creation password is: " + request.body.password);

    db.query(
      "INSERT INTO DRIVER(First_name, Last_name, Email, Password_hash, Password_salt, Address, Phone_number, VisibleFlag) VALUES(?,?,?,?,?,?,?,?);",
      [
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        hash,
        salt,
        request.body.street,
        request.body.phoneNum,
        1,
      ],
      (error, result) => {
        if (error) throw error;
        response.send(true);
      }
    );
  }
});

//Create a Sponsor
router.post("/createsponsor", (req, res) => {
  console.log("Hit create sponsor");
  db.query(
    "SELECT COUNT(*) FROM SPONSORORG WHERE name = ?;",
    req.body.name,
    (error, result) => {
      if (error) {
        console.log("Something went wrong looking for a sponsor");
      }
      if (result >= 1) {
        res.send(false);
      } else {
        db.query(
          "INSERT INTO SPONSORORG(name, Driver_rules, Conversion_scale, Catalog_rules) VALUES(?,?,?,?);",
          [
            req.body.name,
            req.body.dRules,
            req.body.conversionScale,
            req.body.cRules,
          ],
          (errorCreate, resultCreate) => {
            if (error) {
              console.log("Something went wrong creating a sponsor");
            } else {
              res.send(true);
            }
          }
        );
      }
    }
  );
});

// create sponsor sub account (TODO: should only be accessed if a sponsor is authenticated)
router.post("/createsponsorsubuser", (request, response) => {
  // check if account already exists
  console.log("Hit create sponsor subuser");
  db.query(
    "SELECT COUNT(*) FROM SPONSORACCT WHERE Email = ?;",
    [request.body.email],
    (error, result) => {
      if (error) {
        throw error;
      } else if (result == 1) {
        response.send(false);
      } else {
        // create hash and salt
        let salt = new Date().toISOString();
        let hash = crypto
          .createHash("sha256")
          .update(request.body.password + salt)
          .digest("base64");

        db.query(
          "INSERT INTO SPONSORACCT(First_name, Last_name, Email, Password_hash, Password_salt, Address, Phone_number, VisibleFlag) VALUES(?,?,?,?,?,?,?,?);",
          [
            request.body.firstName,
            request.body.lastName,
            request.body.email,
            hash,
            salt,
            request.body.street,
            request.body.phoneNum,
            1,
          ],
          (errorInsert) => {
            if (errorInsert) {
              console.log("Error Creating Sponsor sub user");
              throw error;
            } else {
              response.send(true);
            }
          }
        );
      }
    }
  );
});

// read account
router.get("/read", (request, response) => {
  // select record given uid
  console.log("Hit account read");
  db.query(
    "SELECT * FROM ? WHERE UID = ?",
    [request.params.role, request.params.uid],
    (error, result) => {
      if (error) throw error;
      response.send(JSON.stringify(result));
    }
  );
});

// update account
router.post("/update", (request, response) => {
  console.log("Hit update account");
  db.query(
    "UPDATE ? SET First_name = ?, Last_name = ?, Email = ?, Address = ?, Phone_number = ? WHERE UID = ?;",
    [
      request.body.role,
      request.body.firstName,
      request.body.lastName,
      request.body.email,
      request.body.street,
      request.body.phoneNum,
    ],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
});

// delete account
router.post("/delete", (request, response) => {
  console.log("Hit delete account");
  db.query(
    "UPDATE ? SET VisibleFlag = 0 WHERE UID = ?;",
    [request.body.role, request.body.uid],
    (error, result) => {
      if (error) throw error;
      response.send(true);
    }
  );
});

module.exports = router;
