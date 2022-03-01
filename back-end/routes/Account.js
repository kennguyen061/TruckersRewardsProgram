const router = require("express").Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');

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
    console.log("Connected");
});

// access account
router.get("/", (request, respsonse) => {
    console.log(request.body);
    connection.query("SELECT Password_hash, Password_salt FROM DRIVER WHERE Email = ?;",
        [
            request.body.email
        ],
        (error, result) => {
            if (error) throw error;
            let hash = crypto.createHash("sha256").update(request.body.password + result[0].Password_salt).digest("base64");
            if (hash == result[0].Password_hash) {
                respsonse.send(true);
            } else {
                respsonse.send(false);
            }
        }
    );
});

// create account
router.post("/create", (request, respsonse) => {
    console.log(request.body);
    let salt = new Date();
    let hash = crypto.createHash("sha256").update(request.body.password + salt).digest("base64");
    connection.query("INSERT INTO DRIVER(First_name, Last_name, Email, Password_hash, Password_salt, Address, Phone_number, VisibleFlag) VALUES(?,?,?,?,?,?,?,?)",
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
            console.log("account created");
            respsonse.send("account created");
        }
    );
});

// read account
router.get("/read", (request, respsonse) => {
    console.log(request.body);
    connection.query("SELECT * FROM ? WHERE UID = ?",
        [
            request.body.role,
            request.body.uid
        ],
        (error, result) => {
            if (error) throw error;
            respsonse.send(result);
        }
    );
});

// update account
router.post("/update", (request, respsonse) => {
    //const UID = request.query.id;
    //const role = request.query.role;
    //const sql = "UPDATE " + role.toUpperCase + " SET {FILL VALUES} WHERE UID = " + UID + ";";
    //connection.query(sql, (error, result) => {
    //    if (error) throw error;
    //    console.log("Account updated");
    //});
});

// delete account
router.post("/delete", (request, respsonse) => {
    connection.query("UPDATE ? SET VisibleFlag = 0 WHERE UID = ?;",
        [
            request.body.role,
            request.body.uid
        ],
        (error, result) => {
            if (error) throw error;
            console.log("account hidden");
        }
    );
});

module.exports = router;