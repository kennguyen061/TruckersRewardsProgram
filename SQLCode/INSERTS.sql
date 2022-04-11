USE CPSC4910;
INSERT INTO APPLICATION (AppStatus, AppDate, UID, SID) VALUES('','','','');
INSERT INTO CATALOG (SID) VALUES('');
INSERT INTO DRIVER(First_name, Last_name, Email, Password_hash,Password_salt, Address, Phone_number, VisibleFlag,SID) VALUES ('','','','','','','',1,'');
INSERT INTO DRIVERWISHLIST(UID) VALUES ('');
INSERT INTO ITEM(Quantity,Price,OrderID) VALUES('','','');
INSERT INTO ORDERS(OrderDate, Address, UID) VALUES ('','','');
INSERT INTO POINTBALANCE(Conversion_scale,Amount,UID) VALUES ('','','');
INSERT INTO POINTBALANCELOG(Point_Update,Update_Status,PointDate,PointID,SUID) VALUES('','','','','');
INSERT INTO SPONSORACCT(First_name, Last_name, Email, Password_hash,Password_salt, Address, Phone_number, VisibleFlag,SID) VALUES ('','','','','','','',1,'');
INSERT INTO SPONSORORG(name, Driver_rules) VALUES('','');
INSERT INTO WISHLISTITEM(WishlistID) VALUES('');
INSERT INTO ADMIN (First_name, Last_name, Email, Password_hash, Password_salt, Address, Phone_number, VisibleFlag, SID) VALUES ('','','','','','','',1,'');
INSERT INTO PASSWORDCHANGES (User_type, Pwd_date, Email, Change_type) VALUES ('','','','');
INSERT INTO LOGINATTEMPTS (Login_date, Username, Status) VALUES ('','','');
INSERT INTO REPORTING (A_ID, PwdChangeID, AttemptID) VALUES ('','','');

-- Insert new driver test
INSERT INTO SPONSORORG(name, Driver_rules) VALUES('Clemson','Ship Aramark food');
INSERT INTO DRIVER(First_name, Last_name, Email, Password_hash,Password_salt, Address, Phone_number, VisibleFlag,SID) VALUES ('Kenny','Nguyen','kennyn@clemson.edu','dsjflsjdlfj','dsfjsdfll','203 Kelly Road','8645593840',1,'1');
SELECT * FROM DRIVER;
DELETE FROM DRIVER WHERE First_name = 'Kenny';

-- Login test
SELECT * FROM DRIVER WHERE Email = 'kennyn@clemson.edu' AND Password_hash = 'dsjflsjdlfj';

-- Sample to test audit logging
INSERT INTO POINTBALANCE(Conversion_scale,Amount,UID) VALUES(1,0,4);
SELECT * FROM POINTBALANCE;

INSERT INTO DRIVER(UID,First_name,Last_name,Email,Password_hash,Password_salt,Address,Phone_number,VisibleFlag) VALUES(1,'Test','Driver','testdriver@clemson.edu','lfsdjflsdjf','dslfksjdlfjsdf','100 Daniel Dr', '864-844-3242',1);
SELECT * FROM DRIVER;

INSERT INTO SPONSORORG(SID, name, Driver_rules,Conversion_scale) VALUES(1,'Clemson','drive good',1000);
SELECT * FROM SPONSORORG;

SELECT * FROM CARTITEM WHERE UID = 1 AND SID = 1 AND ITEMID = '';

SELECT * FROM CARTITEM WHERE UID = 1 AND SID = 1 AND ITEMID = 12388;

INSERT INTO CARTITEM(ItemID, ItemName, Price, Quantity, UID, SID) VALUES(12388,'Etsy Item','1000',1,1,1);

UPDATE CARTITEM SET Quantity = 2 WHERE ItemID = 12388 AND UID = 1 AND SID = 1