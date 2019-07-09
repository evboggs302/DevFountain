delete from hasskills 
where skill_id = $1 and user_id = $2;

select *
from hasskills
where user_id = $2;