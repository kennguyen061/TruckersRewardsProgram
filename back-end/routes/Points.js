const router = require("express").Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');

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

// access points
router.get("/", (request, respsonse) => {
    db.query("SELECT Amount FROM POINTBALANCE WHERE PointID = ?;", [PointID],
        (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                console.log("Points accessed.")
                response.send(result[0].Amount);
            }
        }
    );
});

// update points
router.post("/update", (request, respsonse) => {

    // select point ID
    db.query("SELECT PointID FROM POINTBALANCE WHERE UID = ? AND SID = ?;",
        [
            request.body.UID,
            request.body.SID
        ],
        (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                Poin = result[0].PointID;
            }
        }
    );

    // insert new balance
    db.query("INSERT INTO POINTBALANCELOG(Point_Update,Update_Status,PointDate,PointID,SID) VALUES (?,?,CURRENT_TIMESTAMP(),?,?",
        [
            request.body.currentPoints,
            request.body.Reason,
            request.body.PointID,
            request.body.SID
        ],
        (error, result) => {
            if (error) throw error;
        }
    );
});

//Function to Update PointBalance log entity to call in modify points function
// function updatePointBalanceLog(currentPoints, Reason, PointID, SID) {
//    db.query("INSERT INTO POINTBALANCELOG(Point_Update,Update_Status,PointDate,PointID,SID) VALUES (?,?,CURRENT_TIMESTAMP(),?,?",
//    [
//        currentPoints,
//        Reason,
//        PointID,
//        SID
//    ],
//    (error, result) => {
//        if (error) throw error;
//    }
//    );
//}


////Use this to fill in PointID in the following functions
//const findPointID = (UID, SID) => {
//    PointID = 0
//    db.query("SELECT PointID FROM POINTBALANCE WHERE UID = ? AND SID = ?;",
//    [   
//        UID,
//        SID
//    ],
//    (error, result) => {
//        if (error) throw error;
//        if(result.length > 0) {
//            PointID = result[0].PointID;
//        }
//    }
//    );
//    return PointID;
//};

//Retrieve Current points of a PointID

//Modifies current points
function modifypoints(PointID,points,Reason,SID) {
    currentPoints = 0;
    db.query("SELECT Amount FROM POINTBALANCE WHERE PointID = ?;", 
        [PointID],
        (error, result) => {
            if (error) throw error;
            if(result.length > 0) {
                currentPoints = result[0].Amount;
            }
        }
    );
    newPoints = currentPoints + points;
    db.query("UPDATE POINTBALANCE SET Amount = ? WHERE PointID = ?;",
        [
            newPoints,
            PointID
        ],
        (error, result) => {
            if (error) throw error;
            console.log(result);
            updatePointBalanceLog(newPoints,Reason,PointID,SID);
        }
    );
};

module.exports = router;