-- This will get all the users who you are following

select *
from following
where user_id = $1;