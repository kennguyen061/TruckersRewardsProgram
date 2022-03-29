const router = require("express").Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { response } = require("express");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// specify database
const db = mysql.createConnection({
    host: "database-1.cy0nrpgxkpzk.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "test1337froggang"
});

// connect to database
db.connect((error) => {
    if (error) throw error;
});

// record login attempt
function loginAttempt(email, status) {
    db.query("INSERT INTO LOGINATTEMPTS(Login_date, Username, Status) VALUES(CURRENT_TIMESTAMP(), ?, ?);",
        [
            email,
            status
        ],
        (error) => {
            if (error) throw error;
        }
    );
}

// access account
router.get("/", (request, respsonse) => {

    responseBody = {
        exists: false,
        role: null
    }

    // check against driver table
    db.query("SELECT Password_hash, Password_salt FROM DRIVER WHERE Email = ?;",
        [
            request.body.email
        ],
        (error, result) => {
            if (error) throw error;
            if (result.length === 0) return;
            let hash = crypto.createHash("sha256").update(request.body.password + result[0].Password_salt).digest("base64");
            if (hash === result[0].Password_hash) {
                responseBody.exists = true;
                responseBody.role = "Driver"
            }
        }
    );

    if (responseBody.exists) {
        loginAttempt(request.body.email, "Success");
        response.send(responseBody)
        return
    }

    // check against sponsor table
    db.query("SELECT Password_hash, Password_salt FROM SPONSORACCT WHERE Email = ?;",
        [
            request.body.email
        ],
        (error, result) => {
            if (error) throw error;
            if (result.length === 0) return;
            let hash = crypto.createHash("sha256").update(request.body.password + result[0].Password_salt).digest("base64");
            if (hash === result[0].Password_hash) {
                responseBody.exists = true;
                responseBody.role = "Sponsor"
            }
        }
    );

    if (responseBody.exists) {
        loginAttempt(request.body.email, "Success");
        response.send(responseBody)
        return
    }

    // check against admin table
    db.query("SELECT Password_hash, Password_salt FROM ADMIN WHERE Email = ?;",
        [
            request.body.email
        ],
        (error, result) => {
            if (error) throw error;
            if (result.length === 0) return;
            let hash = crypto.createHash("sha256").update(request.body.password + result[0].Password_salt).digest("base64");
            if (hash === result[0].Password_hash) {
                responseBody.exists = true;
                responseBody.role = "Admin"
            }
        }
    );

    if (responseBody.exists) {
        loginAttempt(request.body.email, "Success");
    } else {
        loginAttempt(request.body.email, "Failure");
    }

    response.send(responseBody)
});

// create account
router.post("/create", (request, respsonse) => {
    console.log(request.body);
    let salt = new Date();
    let hash = crypto.createHash("sha256").update(request.body.password + salt).digest("base64");
    db.query("INSERT INTO DRIVER(First_name, Last_name, Email, Password_hash, Password_salt, Address, Phone_number, VisibleFlag) VALUES(?,?,?,?,?,?,?,?)",
        [
            request.body.firstName,
            request.body.lastName,
            request.body.email,
            hash,
            salt,
            request.body.street,
            request.body.phoneNum,
            1
        ],
        (error, result) => {
            if (error) throw error;
            console.log("Account created.");
            respsonse.send(result);
        }
    );
});

// read account
router.get("/read", (request, respsonse) => {
    console.log(request.body);
    db.query("SELECT * FROM ? WHERE UID = ?",
        [
            request.body.role,
            request.body.uid
        ],
        (error, result) => {
            if (error) throw error;
            console.log("Account read.");
            respsonse.send(result);
        }
    );
});

// update account
router.post("/update", (request, respsonse) => {
});

// delete account
router.post("/delete", (request, respsonse) => {
    db.query("UPDATE ? SET VisibleFlag = 0 WHERE UID = ?;",
        [
            request.body.role,
            request.body.uid
        ],
        (error, result) => {
            if (error) throw error;
            console.log("Account hidden.");
        }
    );
});

module.exports = router;