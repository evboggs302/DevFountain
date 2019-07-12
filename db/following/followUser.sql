-- This updates following table when a user wants to follow another user
-- Follower and $1 is the user who is logged in
-- Followed and $2 is the user who you want to follow

INSERT into following(follower, followed)
values ($1, $2)