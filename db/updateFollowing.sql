-- This updates following table when a user wants to follow another user
-- User and $1 is the user who is logged in
-- Followed and $2 is the user who you want to follow

update following
set followed = $2
where user_id = $1;

select * from following
where user_id = $1;