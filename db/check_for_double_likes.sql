select *
from postlikes
where post_id = $1 and user_id = $2;