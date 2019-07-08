insert into users(first, last, developer, email, password)
values
($1, $2, $3, $4, $5);

select first, last, developer, email from users
where email = $4;