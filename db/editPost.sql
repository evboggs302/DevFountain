update posts
set content = $1
where post_id = $2 and user_id = $3;

select *
from posts
where user_id = $3;