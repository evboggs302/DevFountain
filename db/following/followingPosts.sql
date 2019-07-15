-- select * from posts
-- where user_id = $1

select users.first, users.last, posts.content, posts.time_entered, users.profile_pic
from posts
inner join users on posts.user_id = users.user_id
where posts.user_id = $1