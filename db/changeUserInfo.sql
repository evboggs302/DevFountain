update users
set first = $1, last = $2, title = $3, linkedin = $4, portfolio = $5, profile_pic = $6
where user_id = $7;

select user_id, first, last, title, developer, linkedin, portfolio, profile_pic
from users
where user_id = $7;