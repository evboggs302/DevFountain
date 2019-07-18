insert into following(user_id, followed)
values
    ($1, $2);

select *
from following
where user_id = $1;