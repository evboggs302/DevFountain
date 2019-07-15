UPDATE hasskills
SET skills = $2
WHERE user_id = $1;

select skills from hasskills
where user_id = $1;