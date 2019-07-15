-- This will get all the users who you are following
-- follower and $1 is the user id of who is logged in

SELECT DISTINCT followed
from following
where follower = $1;