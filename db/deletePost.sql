delete from postlikes
where post_id = $2;

delete from posts 
where user_id = $1 and post_id = $2;

select *
from posts
where user_id = $1;