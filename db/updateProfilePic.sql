update users
set profile_pic = $2
where user_id = $1;

select * from users
where user_id = $1;