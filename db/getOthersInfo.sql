select user_id, first, last, title, developer, linkedin, portfolio, profile_pic, email
from users
where email = $1;