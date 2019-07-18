insert into posts
    (content, time_entered, user_id)
values($1, $2, $3);

select users.first, users.last, posts.content, posts.time_entered, users.profile_pic, posts.post_id
from posts
inner join users on posts.user_id = users.user_id
where posts.user_id = $3;