delete from posts 
where user_id = $1;

select *
from posts
where user_id = $1;