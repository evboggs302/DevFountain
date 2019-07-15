insert into users(first, last, developer, email, password, profile_pic)
values
($1, $2, $3, $4, $5, $6);

select first, last, developer, email, user_id from users
where email = $4;