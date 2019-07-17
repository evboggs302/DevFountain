insert into hasskills
    (user_id, skills)
values
    ($1, $2);

select *
from hasskills
where user_id = $1;