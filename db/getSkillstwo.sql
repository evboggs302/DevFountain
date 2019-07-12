select skills.skill, skills.icon
from hasskills
inner join skills on skills.skill_id = hasskills.skill_id
where user_id = $1;