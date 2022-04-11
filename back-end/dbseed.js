const mysql = require("mysql");

// Connects to RDS Database
const db = mysql.createConnection({
  host: "team1-db.cobd8enwsupz.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "y4PVPHuqVq52Pvp",
});

//Creates Database and Tables
con.connect(function (err) {
  if (err) throw err;

  //Creates Schema and uses it
  con.query("CREATE DATABASE IF NOT EXISTS CPSC4910;");
  con.query("USE CPSC4910;");

  //Creates SPONSORORG Table
  con.query(
    "CREATE TABLE IF NOT EXISTS SPONSORORG (SID int auto_increment NOT NULL unique,name varchar(20) NOT NULL,Driver_rules varchar(20) NOT NULL,Conversion_scale FLOAT NOT NULL,primary key (SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates CATALOG Table
  con.query(
    "CREATE TABLE IF NOT EXISTS CATALOG (CatID int auto_increment NOT NULL unique,SID int NOT NULL,primary key (CatID),foreign key (SID) references SPONSORORG(SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates DRIVER Table
  con.query(
    "CREATE TABLE IF NOT EXISTS DRIVER (UID int auto_increment NOT NULL unique,First_name varchar(20) NOT NULL,Last_name varchar(20) NOT NULL,Email varchar(20) NOT NULL,Password_hash varchar(255) NOT NULL,Password_salt varchar(60) NOT NULL,Address varchar(20) NOT NULL,Phone_number char(12) NOT NULL,VisibleFlag BIT NOT NULL,primary key (UID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates SPONSORANDDRIVER TABLE
  con.query(
    "CREATE TABLE IF NOT EXISTS SPONSORANDDRIVER (UID int,SID int,primary key (UID, SID),foreign key (UID) references DRIVER(UID),foreign key (SID) references SPONSORANDDRIVER(SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates DRIVERWISHLIST Table
  con.query(
    "CREATE TABLE IF NOT EXISTS DRIVERWISHLIST (WishlistID int auto_increment NOT NULL unique,UID int NOT NULL,SID int NOT NULL,primary key (WishlistID),foreign key (UID) references DRIVER(UID),foreign key (SID) references SPONSORORG(SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates WISHLISTITEM Table
  con.query(
    "CREATE TABLE IF NOT EXISTS WISHLISTITEM (ItemID int auto_increment NOT NULL unique,ItemName varchar(255),Cost int,WishlistID int NOT NULL,primary key (ItemID),foreign key (WishlistID) references DRIVERWISHLIST(WishlistID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates SPONSORACCT Table
  con.query(
    "CREATE TABLE IF NOT EXISTS SPONSORACCT (SUID int auto_increment NOT NULL unique,First_name varchar(20) NOT NULL,Last_name varchar(20) NOT NULL,Email varchar(20) NOT NULL,Password_hash varchar(255) NOT NULL,Password_salt varchar(60) NOT NULL,Address varchar(20) NOT NULL,Phone_number char(12) NOT NULL,VisibleFlag BIT NOT NULL,SID int NOT NULL,primary key (SUID),foreign key (SID) references SPONSORORG(SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates POINTBALANCE Table
  con.query(
    "CREATE TABLE IF NOT EXISTS POINTBALANCE (PointID int auto_increment NOT NULL unique, Amount int NOT NULL,UID int NOT NULL,SID int NOT NULL,primary key (PointID),foreign key (UID) references DRIVER(UID),foreign key (SID) references SPONSORANDDRIVER(SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates POINTBALANCELOG Table
  con.query(
    "CREATE TABLE IF NOT EXISTS POINTBALANCELOG (PlogID int auto_increment NOT NULL unique,Point_Update int NOT NULL, Update_Status varchar(20) NOT NULL,PointDate DATETIME NOT NULL,PointID int NOT NULL,SID int NOT NULL,primary key (PlogID),foreign key (PointID) references POINTBALANCE(PointID),foreign key (SID) references SPONSOR(SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates APPLICATION Table
  con.query(
    "CREATE TABLE IF NOT EXISTS APPLICATION (AppID int auto_increment NOT NULL unique,AppStatus int NOT NULL,AppDate DATETIME NOT NULL,UID int NOT NULL,SID int NOT NULL,Reason varchar(255),primary key (AppID),foreign key (UID) references DRIVER(UID),foreign key (SID) references SPONSORORG(SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates ORDERS Table
  con.query(
    "CREATE TABLE IF NOT EXISTS ORDERS (OrderID int auto_increment NOT NULL unique,OrderDate DATETIME NOT NULL,Address varchar(20) NOT NULL,UID int NOT NULL,SID int NOT NULL,primary key (OrderID),foreign key (UID) references DRIVER(UID),foreign key (SID) references SPONSORORG(SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates ITEM Table
  con.query(
    "CREATE TABLE IF NOT EXISTS ITEM (ItemID int auto_increment NOT NULL unique,Quantity int NOT NULL,Price float NOT NULL,OrderID int NOT NULL,primary key (ItemID),foreign key (OrderID) references ORDERS(OrderID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates ADMIN Table
  con.query(
    "CREATE TABLE IF NOT EXISTS ADMIN (A_ID int auto_increment NOT NULL unique,First_name varchar(20) NOT NULL,Last_name varchar(20) NOT NULL,Email varchar(20) NOT NULL,Password_hash varchar(255) NOT NULL,Password_salt varchar(60) NOT NULL,Address varchar(60) NOT NULL,Phone_number char(12) NOT NULL,VisibleFlag BIT NOT NULL,SID int NOT NULL,primary key (A_ID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates PASSWORDCHANGES
  con.query(
    "CREATE TABLE IF NOT EXISTS PASSWORDCHANGES (PwdChangeID int auto_increment NOT NULL unique,User_type varchar(20) NOT NULL,Pwd_date DATETIME NOT NULL,Email varchar(20) NOT NULL,Change_type varchar(20) NOT NULL,primary key (PwdChangeID));",
    function (error, result, fields) {
      console.log(result);
    }
  );
  //CREATES LOGINATTEMPTS
  con.query(
    "CREATE TABLE IF NOT EXISTS LOGINATTEMPTS (AttemptID int auto_increment NOT NULL unique,Login_date DATETIME NOT NULL,Username varchar(20) NOT NULL,Status varchar(20) NOT NULL,primary key (AttemptID));",
    function (error, result, fields) {
      console.log(result);
    }
  );
  //CREATES REPORTING
  con.query(
    "CREATE TABLE IF NOT EXISTS REPORTING (A_ID int auto_increment NOT NULL,PwdChangeID int NOT NULL,AttemptID int NOT NULL,foreign key (A_ID) references ADMIN(A_ID),foreign key (PwdChangeID) references PASSWORDCHANGES(PwdChangeID),foreign key (AttemptID) references LOGINATTEMPTS(AttemptID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  //Creates CARTITEM Table
  con.query(
    "CREATE TABLE IF NOT EXISTS CARTITEM (ItemID int auto_increment NOT NULL,ItemName varchar(255) NOT NULL,Price float NOT NULL,Quantity int NOT NULL,UID int NOT NULL,SID int NOT NULL,primary key (ItemID),foreign key (UID) references DRIVER(UID), foreign key (SID) references SPONSORORG(SID));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  con.end();
});
