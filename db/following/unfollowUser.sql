-- This updates the following table when a user wants to unfollow another user
-- follower and $1 is the user who is logged in
-- followed and $2 is the user who you want to unfollow

DELETE from following
where follower = $1 and followed = $2