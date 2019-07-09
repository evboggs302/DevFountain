insert into postlikes
    (post_id, user_id)
values($1, $2);

select *
from postlikes
where post_id = $1;