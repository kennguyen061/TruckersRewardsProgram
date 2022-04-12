-- Sponsor Updates

UPDATE SPONSORACCT
SET First_name =  ''
WHERE SUID = '';

UPDATE SPONSORACCT
SET Last_name =  ''
WHERE SUID = '';

UPDATE SPONSORACCT
SET Email =  ''
WHERE SUID = '';

UPDATE SPONSORACCT
SET Password_hash =  ''
WHERE SUID = '';

UPDATE SPONSORACCT
SET Password_salt =  ''
WHERE SUID = '';

UPDATE SPONSORACCT
SET Address =  ''
WHERE SUID = '';

UPDATE SPONSORACCT
SET Phone_number =  ''
WHERE SUID = '';

UPDATE SPONSORACCT
SET VisibleFlag =  ''
WHERE SUID = '';

-- Driver Updates

UPDATE DRIVER
SET First_name =  ''
WHERE UID = '';

UPDATE DRIVER
SET Last_name =  ''
WHERE UID = '';

UPDATE DRIVER
SET Email =  ''
WHERE UID = '';

UPDATE DRIVER
SET Password_hash =  ''
WHERE UID = '';

UPDATE DRIVER
SET Password_salt =  ''
WHERE UID = '';

UPDATE DRIVER
SET Address =  ''
WHERE UID = '';

UPDATE DRIVER
SET Phone_number =  ''
WHERE UID = '';

UPDATE DRIVER
SET VisibleFlag =  ''
WHERE UID = '';

-- Update SPONSORORG
UPDATE SPONSORORG
SET name = ''
WHERE SID = '';

UPDATE SPONSORORG
SET driver_rules = ''
WHERE SID = '';

-- REMOVE WISHLIST ITEMS
DELETE FROM WISHLISTITEM
WHERE ItemID = '';

-- UPDATE POINTBALANCE
UPDATE POINTBALANCE
SET Conversion_scale = ''
WHERE PointID = '';

UPDATE POINTBALANCE
SET Amount = ''
WHERE PointID = '';

-- UPDATE APPLICATION
UPDATE APPLICATION
SET Appstatus = ''
WHERE AppID = '';

UPDATE APPLICATION
SET Appdate = ''
WHERE AppID = '';

-- UPDATE ORDERS (add more fields?)
UPDATE ORDERS
SET Orderdate = ''
WHERE OrderID = '';

UPDATE ORDERS
SET Orderdate = ''
WHERE Address = '';

-- UPDATE ITEM
UPDATE ITEM
SET Quantity = ''
WHERE ItemID = '';

UPDATE ITEM
SET Price = ''
WHERE ItemID = '';

-- UPDATE CATALOG
UPDATE SPONSORORG
SET Catalog_rules = JSON_INSERT(Catalog_rules,?)
WHERE SID = ?;


