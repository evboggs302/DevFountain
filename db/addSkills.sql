insert into hasskills
    (skill_id, user_id)
values
    ($1, $2);

select *
from hasskills
where user_id = $2;