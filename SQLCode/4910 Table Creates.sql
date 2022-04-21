CREATE DATABASE IF NOT EXISTS CPSC4910;
USE CPSC4910;

CREATE TABLE IF NOT EXISTS SPONSORORG (
	SID int auto_increment NOT NULL unique,
    name varchar(20) NOT NULL,
    Driver_rules varchar(65535),
	Conversion_scale FLOAT NOT NULL DEFAULT 0.1,
    Catalog_rules varchar(65535),
    primary key (SID)
    );

-- todo find max hash length of Base64 for Password_hash
CREATE TABLE IF NOT EXISTS DRIVER (
	UID int auto_increment NOT NULL unique,
    First_name varchar(20) NOT NULL,
    Last_name varchar(20) NOT NULL,
    Email varchar(255) NOT NULL,
    Password_hash varchar(65535) NOT NULL,
    Password_salt varchar(60) NOT NULL,
    Address varchar(20) NOT NULL,
    Phone_number char(12) NOT NULL,
    VisibleFlag BIT NOT NULL,
    primary key (UID)
    );
    
CREATE TABLE IF NOT EXISTS SPONSORANDDRIVER (
	UID int,
    SID int,
    primary key (UID, SID),
    foreign key (UID) references DRIVER(UID),
    foreign key (SID) references SPONSORORG(SID)
);

CREATE TABLE IF NOT EXISTS DRIVERWISHLIST (
	WishlistID int auto_increment NOT NULL unique,
    UID int NOT NULL,
    SID int NOT NULL,
    primary key (WishlistID),
    foreign key (UID) references DRIVER(UID),
    foreign key (SID) references SPONSORORG(SID)
    );
    
CREATE TABLE IF NOT EXISTS WISHLISTITEM (
	ItemID int auto_increment NOT NULL unique,
    ItemName varchar(255),
    Cost int,
    WishlistID int NOT NULL,
    primary key (ItemID),
    foreign key (WishlistID) references DRIVERWISHLIST(WishlistID)
    );

-- todo find max hash length of Base64 for Password_hash
CREATE TABLE IF NOT EXISTS SPONSORACCT (
	SUID int auto_increment NOT NULL unique,
    First_name varchar(20) NOT NULL,
    Last_name varchar(20) NOT NULL,
    Email varchar(255) NOT NULL,
    Password_hash varchar(65535) NOT NULL,
    Password_salt varchar(60) NOT NULL,
    Address varchar(20) NOT NULL,
    Phone_number char(12) NOT NULL,
    VisibleFlag BIT NOT NULL,
    SID int NOT NULL,
    primary key (SUID),
    foreign key (SID) references SPONSORORG(SID)
);
    
CREATE TABLE IF NOT EXISTS POINTBALANCE (
	PointID int auto_increment NOT NULL unique,
    Amount int NOT NULL,
    UID int NOT NULL,
    SID int NOT NULL,
    primary key (PointID),
    foreign key (UID) references DRIVER(UID),
    foreign key (SID) references SPONSORANDDRIVER(SID)
    );
    
CREATE TABLE IF NOT EXISTS POINTBALANCELOG (
	PlogID int auto_increment NOT NULL unique,
    Point_Update int NOT NULL, 
    Update_Status varchar(20) NOT NULL,
    PointDate DATETIME NOT NULL,
    PointID int NOT NULL,
    SID int NOT NULL,
    primary key (PlogID),
    foreign key (PointID) references POINTBALANCE(PointID),
    foreign key (SID) references POINTBALANCE(SID)
    );
    
CREATE TABLE IF NOT EXISTS APPLICATION (
	AppID int auto_increment NOT NULL unique,
    AppStatus int NOT NULL,
    AppDate DATETIME NOT NULL,
    UID int NOT NULL,
    SID int NOT NULL,
    Reason varchar(255),
    primary key (AppID),
    foreign key (UID) references DRIVER(UID),
    foreign key (SID) references SPONSORORG(SID)
    );
    
CREATE TABLE IF NOT EXISTS ORDERS (
	OrderID int auto_increment NOT NULL unique,
	OrderDate DATETIME NOT NULL,
	Address varchar(20) NOT NULL,
    Total int NOT NULL,
	UID int NOT NULL,
	SID int NOT NULL,
	primary key (OrderID),
	foreign key (UID) references DRIVER(UID),
	foreign key (SID) references SPONSORORG(SID));
    
CREATE TABLE IF NOT EXISTS ITEM (
	ItemID int auto_increment NOT NULL unique,
    ItemName varchar(255) NOT NULL,
    Quantity int NOT NULL,
    Price float NOT NULL,
    OrderID int NOT NULL,
    primary key (ItemID, OrderID),
    foreign key (OrderID) references ORDERS(OrderID)
    );
    
CREATE TABLE IF NOT EXISTS ADMIN (
	A_ID int auto_increment NOT NULL unique,
    First_name varchar(20) NOT NULL,
    Last_name varchar(20) NOT NULL,
    Email varchar(255) NOT NULL,
    Password_hash varchar(65535) NOT NULL,
    Password_salt varchar(60) NOT NULL,
    Address varchar(60) NOT NULL,
    Phone_number char(12) NOT NULL,
    VisibleFlag BIT NOT NULL,
    SID int NOT NULL,
    primary key (A_ID)
    );
	
CREATE TABLE IF NOT EXISTS PASSWORDCHANGES (
	PwdChangeID int auto_increment NOT NULL unique,
    User_type varchar(20) NOT NULL,
    Pwd_date DATETIME NOT NULL,
    Email varchar(20) NOT NULL,
    Change_type varchar(20) NOT NULL,
    primary key (PwdChangeID)
    );
	
CREATE TABLE IF NOT EXISTS LOGINATTEMPTS (
	AttemptID int auto_increment NOT NULL unique,
    Login_date DATETIME NOT NULL,
    Username varchar(20) NOT NULL,
    Status varchar(20) NOT NULL,
    primary key (AttemptID)
	);
	
CREATE TABLE IF NOT EXISTS REPORTING (
    A_ID int auto_increment NOT NULL,
    PwdChangeID int NOT NULL,
    AttemptID int NOT NULL,
    foreign key (A_ID) references ADMIN(A_ID),
	foreign key (PwdChangeID) references PASSWORDCHANGES(PwdChangeID),
	foreign key (AttemptID) references LOGINATTEMPTS(AttemptID)
    );
    
CREATE TABLE IF NOT EXISTS CARTITEM (ItemID int auto_increment NOT NULL,ItemName varchar(255) NOT NULL,Price float NOT NULL,Quantity int NOT NULL,UID int NOT NULL,SID int NOT NULL,primary key (ItemID),foreign key (UID) references DRIVER(UID), foreign key (SID) references SPONSORORG(SID));