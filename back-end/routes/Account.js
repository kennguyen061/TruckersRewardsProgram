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

/*Password complexity system original code from
 https://www.geeksforgeeks.org/check-if-a-string-contains-uppercase-lowercase-special-characters-and-numeric-values/:
  modified to also check the password to be more than 8 characters
*/
function isAllPresent(str) {
  // Regex to check if a string
  // contains uppercase, lowercase
  // special character & numeric value
  var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );

  // If the string is empty or less than a length of 8
  // then print No
  if (!str || str.length === 0 || str.length < 8) {
    return false;
  }

  // Print Yes If the string matches
  // with the Regex
  if (pattern.test(str)) {
    return true;
  } else {
    return false;
  }
}

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

//TODO: Password change log
function changePasswordlog(User_type, Email, Change_type) {
  db.query(
    "INSERT INTO PASSWORDCHANGES(User_type, Pwd_date, Email, Change_type) VALUES(?,CURRENT_TIMESTAMP(), ?, ?);",
    [User_type, Email, Change_type],
    (error) => {
      if (error) throw error;
    }
  );
}

//TODO: Change password route
router.post("/updatepassword", (request, response) => {
  console.log("Hit update password of account");

  if (request.body.role == "DRIVER") {
    //check current password
    db.query(
      "SELECT UID, Password_hash, Password_salt FROM DRIVER WHERE Email = ?;",
      [request.body.email],
      (error, result) => {
        if (error) throw error;

        let salt = new Date(result[0].Password_salt).toISOString();
        let hash = crypto
          .createHash("sha256")
          .update(request.body.oldpassword + salt)
          .digest("base64");

        if (hash === result[0].Password_hash) {
          let newsalt = new Date().toISOString();
          let newhash = crypto
            .createHash("sha256")
            .update(request.body.newpassword + newsalt)
            .digest("base64");

          console.log("The new hash is: " + newhash);
          console.log("The new salt is: " + newsalt);
          console.log("The new password is: " + request.body.newpassword);

          db.query(
            "UPDATE DRIVER SET Password_hash = ?,Password_salt = ? WHERE Email = ?;",
            [newhash, newsalt, request.body.email],
            (error2) => {
              if (error2) throw error2;
              //call changepasswordlog
              changePasswordlog("DRIVER", request.body.email, newhash);
              response.send(true);
            }
          );
        } else {
          response.send(false);
        }
      }
    );
  } else if (request.body.role == "SPONSOR") {
    //check current password
    db.query(
      "SELECT UID, Password_hash, Password_salt FROM SPONSORACCT WHERE Email = ?;",
      [request.body.email],
      (error, result) => {
        if (error) throw error;

        let salt = new Date(result[0].Password_salt).toISOString();
        let hash = crypto
          .createHash("sha256")
          .update(request.body.oldpassword + salt)
          .digest("base64");

        if (hash === result[0].Password_hash) {
          let newsalt = new Date().toISOString();
          let newhash = crypto
            .createHash("sha256")
            .update(request.body.newpassword + newsalt)
            .digest("base64");

          console.log("The new hash is: " + newhash);
          console.log("The new salt is: " + newsalt);
          console.log("The new password is: " + request.body.newpassword);

          db.query(
            "UPDATE SPONSORACCT SET Password_hash = ?,Password_salt = ? WHERE Email = ?;",
            [newhash, newsalt, request.body.email],
            (error2) => {
              if (error2) throw error2;
              //call changepasswordlog
              changePasswordlog("SPONSOR", request.body.email, newhash);
              response.send(true);
            }
          );
        } else {
          response.send(false);
        }
      }
    );
  } else if (request.body.role == "ADMIN") {
    //check current password
    db.query(
      "SELECT UID, Password_hash, Password_salt FROM ADMIN WHERE Email = ?;",
      [request.body.email],
      (error, result) => {
        if (error) throw error;

        let salt = new Date(result[0].Password_salt).toISOString();
        let hash = crypto
          .createHash("sha256")
          .update(request.body.oldpassword + salt)
          .digest("base64");

        if (hash === result[0].Password_hash) {
          let newsalt = new Date().toISOString();
          let newhash = crypto
            .createHash("sha256")
            .update(request.body.newpassword + newsalt)
            .digest("base64");

          console.log("The new hash is: " + newhash);
          console.log("The new salt is: " + newsalt);
          console.log("The new password is: " + request.body.newpassword);

          db.query(
            "UPDATE ADMIN SET Password_hash = ?,Password_salt = ? WHERE Email = ?;",
            [newhash, newsalt, request.body.email],
            (error2) => {
              if (error2) throw error2;
              //call changepasswordlog
              changePasswordlog("ADMIN", request.body.email, newhash);
              response.send(true);
            }
          );
        } else {
          response.send(false);
        }
      }
    );
  }
});

// access account
router.post("/", (request, response) => {
  console.log("Hit login");

  let responseBody = {
    exists: false,
    id: null,
    role: null,
    sid: null,
  };

  // check driver table
  db.query(
    "SELECT UID, Password_hash, Password_salt FROM DRIVER WHERE Email = ?;",
    [request.body.email],
    (error, result) => {
      if (error) throw error;
      if (result.length === 0) return;

      let salt = new Date(result[0].Password_salt).toISOString();

      db.query(
        "SELECT SID FROM SPONSORANDDRIVER WHERE UID = ?;",
        [result[0].UID],
        (err, ret) => {
          if (err) {
            console.log("problem getting sid");
          } else {
            if (ret.length === 1) {
              responseBody.sid = ret[0].SID;
            }
          }
        }
      );

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

  if (!responseBody.exists) {
    // check sponsor table
    db.query(
      "SELECT Password_hash, Password_salt,SUID,SID FROM SPONSORACCT WHERE Email = ?;",
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
          responseBody.sid = result[0].SID;
        }
        if (responseBody.exists) {
          loginAttempt(request.body.email, "Success");
          response.send(responseBody);
          return;
        }
      }
    );
  } else if (!responseBody.exists) {
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
  } else {
    loginAttempt(request.body.email, "Failure");
    response.send(responseBody);
  }
});

// create account
router.post("/create", (req, res) => {
  console.log("Hit create driver");

  db.query(
    "SELECT COUNT(*) AS RowCount FROM DRIVER WHERE Email = ?;",
    [req.body.email],
    (Error, Result) => {
      if (Error) {
        console.log(
          "There was an error geting the number of users with this email."
        );
        throw Error;
      } else {
        console.log(Result[0].RowCount);

        if (Result[0].RowCount != 0) {
          console.log("The driver exists");
          res.status(404);
          res.send(false);
        } else {
          //TODO: CHECK PASSWORD (MIN 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
          //If it meets requirements:
          if(isAllPresent(req.body.password)) {
            let salt = new Date().toISOString();

            let hash = crypto
              .createHash("sha256")
              .update(req.body.password + salt)
              .digest("base64");
  
            console.log("The creation hash is: " + hash);
            console.log("The creation salt is: " + salt);
            console.log("The creation password is: " + req.body.password);
  
            db.query(
              "INSERT INTO DRIVER(First_name, Last_name, Email, Password_hash, Password_salt, Address, Phone_number, VisibleFlag) VALUES(?,?,?,?,?,?,?,?);",
              [
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                hash,
                salt,
                req.body.street,
                req.body.phoneNum,
                1,
              ],
              (error, result) => {
                if (error) throw error;
                res.send(true);
              }
            );
          }
          //If it doesn't meet password complexity requirements
          else {
            console.log("DRIVER PASSWORD DOES NOT MEET REQUIREMENTS");
            res.send(false);
          }
        }
      }
    }
  );
});

//Create a Sponsor
router.post("/createsponsor", (req, res) => {
  console.log("Hit create sponsor");
  db.query(
    "SELECT COUNT(*) AS RowCount FROM SPONSORORG WHERE name = ?;",
    req.body.name,
    (error, result) => {
      if (error) {
        console.log("Something went wrong looking for a sponsor");
      }
      if (result[0].RowCount != 0) {
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
            if (errorCreate) {
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
    "SELECT COUNT(*) AS RowCount FROM SPONSORACCT WHERE Email = ?;",
    [request.body.email],
    (error, result) => {
      if (error) {
        throw error;
      } else if (result[0].RowCount != 0) {
        response.send(false);
      } else {
        // create hash and salt
        let salt = new Date().toISOString();
        let hash = crypto
          .createHash("sha256")
          .update(request.body.password + salt)
          .digest("base64");

        let org_id = "";

        db.query(
          "SELECT SID FROM SPONSORORG WHERE name = ?;",
          [request.body.sponsorName],
          (error2, result2) => {
            if (error2) {
              console.log("Sponsor does not exists");
              throw error2;
            } else {
              console.log(result2[0].SID);

              org_id = result2[0].SID;
              db.query(
                "INSERT INTO SPONSORACCT( First_name, Last_name, Email, Password_hash, Password_salt, Address, Phone_number, VisibleFlag, SID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
                [
                  request.body.firstName,
                  request.body.lastName,
                  request.body.email,
                  hash,
                  salt,
                  request.body.street,
                  request.body.phoneNum,
                  1,
                  org_id,
                ],
                (errorInsert) => {
                  if (errorInsert) {
                    console.log("Error Creating Sponsor sub user");
                    throw errorInsert;
                  } else {
                    response.send(true);
                  }
                }
              );
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

  let responseBody = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
  };

  if (request.query.role == "DRIVER") {
    console.log("Entered Drivers ass");
    db.query(
      "SELECT * FROM DRIVER WHERE UID = ?;",
      [request.query.id],
      (error, result) => {
        if (error) throw error;
        responseBody.firstName = result[0].First_name;
        responseBody.lastName = result[0].Last_name;
        responseBody.email = result[0].Email;
        responseBody.address = result[0].Address;
        responseBody.phoneNumber = result[0].Phone_number;
        response.send(JSON.stringify(responseBody));
      }
    );
  } else if (request.query.role == "SPONSOR") {
    db.query(
      "SELECT * FROM SPONSORACCT WHERE SUID = ?;",
      [request.query.id],
      (error, result) => {
        if (error) throw error;
        responseBody.firstName = result[0].First_name;
        responseBody.lastName = result[0].Last_name;
        responseBody.email = result[0].Email;
        responseBody.address = result[0].Address;
        responseBody.phoneNumber = result[0].Phone_number;
        response.send(JSON.stringify(responseBody));
      }
    );
  } else if (request.query.role == "ADMIN") {
    db.query(
      "SELECT * FROM ADMIN WHERE A_ID = ?;",
      [request.query.id],
      (error, result) => {
        if (error) throw error;
        responseBody.firstName = result[0].First_name;
        responseBody.lastName = result[0].Last_name;
        responseBody.email = result[0].Email;
        responseBody.address = result[0].Address;
        responseBody.phoneNumber = result[0].Phone_number;
        response.send(JSON.stringify(responseBody));
      }
    );
  }
});

// update account

router.post("/update", (request, response) => {
  console.log("Hit update account");

  if (request.body.role == "DRIVER") {
    db.query(
      "UPDATE DRIVER SET First_name = ?, Last_name = ?, Email = ?, Address = ?, Phone_number = ? WHERE UID = ?;",
      [
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.street,
        request.body.phoneNum,
        request.body.id,
      ],
      (error) => {
        if (error) throw error;
        response.send(true);
      }
    );
  } else if (request.body.role == "SPONSOR") {
    db.query(
      "UPDATE SPONSORACCT SET First_name = ?, Last_name = ?, Email = ?, Address = ?, Phone_number = ? WHERE SUID = ?;",
      [
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.street,
        request.body.phoneNum,
        request.body.id,
      ],
      (error) => {
        if (error) throw error;
        response.send(true);
      }
    );
  } else if (request.body.role == "ADMIN") {
    db.query(
      "UPDATE ADMIN SET First_name = ?, Last_name = ?, Email = ?, Address = ?, Phone_number = ? WHERE A_ID = ?;",
      [
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.street,
        request.body.phoneNum,
        request.body.id,
      ],
      (error) => {
        if (error) throw error;
        response.send(true);
      }
    );
  }
});

// delete account
//needs an if statment to select proper table
//Role is not the same as table
// client should not be able to call this function without uid and role cookie
router.post("/delete", (request, response) => {
  console.log("Hit delete account");

  if (request.body.role == "DRIVER") {
    db.query(
      "UPDATE DRIVER SET VisibleFlag = 0 WHERE UID = ?;",
      [request.body.id],
      (error, result) => {
        if (error) throw error;
        if (result.fieldCount == 0) {
          console.log(result.length);
          response.send(false);
        } else {
          response.send(true);
        }
      }
    );
  } else if (request.body.role == "SPONSOR") {
    db.query(
      "UPDATE SPONSORACCT SET VisibleFlag = 0 WHERE SUID = ?;",
      [request.body.id],
      (error, result) => {
        if (error) throw error;
        if (result.fieldCount == 0) {
          response.send(false);
        } else {
          response.send(true);
        }
      }
    );
  } else if (request.body.role == "ADMIN") {
    db.query(
      "UPDATE ADMIN SET VisibleFlag = 0 WHERE A_ID = ?;",
      [request.body.id],
      (error, result) => {
        if (error) throw error;
        if (result.fieldCount == 0) {
          response.send(false);
        } else {
          response.send(true);
        }
      }
    );
  }
});

module.exports = router;
