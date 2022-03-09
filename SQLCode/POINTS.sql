-- Retrieve Current Amount
SELECT Amount
FROM POINTBALANCE
WHERE PointID = '';

-- Change Current Amount
UPDATE POINTBALANCE
SET Amount = 1000
WHERE PointID = '';


-- todo: add SID to POINTBALANCE
-- Retrieve PointID
SELECT PointID
FROM POINTBALANCE
WHERE UID = '' AND SID = '';

-- Update PointBalancelog
INSERT INTO POINTBALANCELOG(Point_Update, Update_Status, PointDate, PointID, SUID) VALUES('', 'trash driver', CURRENT_TIMESTAMP(), '', '');

-- Retrieve Current Points
SELECT Amount
FROM POINTBALANCE
WHERE PointID = '';