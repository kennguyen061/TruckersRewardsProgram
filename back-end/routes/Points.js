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
    return PointID;
};

//Retrieve Current points of a PointID
const getPoints = (PointID) => {
    currentPoints = 0;
    db.query("SELECT Amount FROM POINTBALANCE WHERE PointID = ?;",[PointID],
    (error,result) => {
        if (error) throw error;
        if(result.length > 0) {
            currentPoints = result[0];
        }
    }
    );
    return currentPoints;
}

//Modifies current points
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
            console.log(result);
        }
    );
};

//WISHLIST ITEM FUNCTIONS

//Use this to find a wishlistID given a UID and SID
const findWishlistID = (UID,SID) => {
    PointID = 0
    db.query("SELECT WishlistID FROM DRIVERWISHLIST WHERE UID = ? AND SID = ?;",
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
    return PointID;
}

//Add an item to wishlist 
function addtowishlist(WishlistID, ItemName, Cost) {
    db.query("INSERT INTO WISHLISTITEM(WishlistID, ItemName, Cost) VALUES(?,?,?)", 
    [
        WishlistID,
        ItemName,
        Cost
    ],
    (error, result) => {
        if (error) throw error;
        console.log(result);
    }
    );
}

//Retrieve all wishlist items given a wishlist in an array
const retrievewishlist = (WishlistID) => {
    db.query("SELECT * FROM DRIVERWISHLIST WHERE WishlistID = ?",[WishlistID],
    (error, result) => {
        if (error) throw error;
        Wishlist = result;
        return Wishlist;
    }
    );
}

//Remove an item from the wishlist
function removeitem(WishlistID, ItemName) {
    db.query("DELETE FROM WISHLISTITEM WHERE WishlistID = ? AND ItemName = ?",[WishlistID, ItemName],
    (error, result) => {
        if (error) throw error;
        console.log(result);
    }       
    );
}