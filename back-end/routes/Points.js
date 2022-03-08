const router = require("express").Router();
const bodyParser = require('body-parser');

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

//TODO: Function to Update PointBalance log entity to call in modify points function


//Use this to fill in PointID in the following functions
const findPointID = (UID, SID) => {
    PointID = 0
    db.query("SELECT PointID FROM POINTBALANCE WHERE UID = ? AND SID = ?;",
    [   
        UID,
        SID
    ],
    (error, result) => {
        if (error) throw error;
        if(result.length > 0) {
            PointID = result[0];
        }
    }
    );
};

function modifypoints(PointID, points) {
    currentPoints = 0;
    db.query("SELECT Amount FROM POINTBALANCE WHERE PointID = ?;", 
        [PointID],
        (error, result) => {
            if (error) throw error;
            if(result.length > 0) {
                currentPoints = result[0];
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

        }
    );
};