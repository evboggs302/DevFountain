select u.email, m.content, m.time_sent, m.sender, m.reciever, m.message_id
from users u
    join messages m on u.user_id = m.sender
where (sender = $1 and reciever = $2) or (sender = $2 and reciever = $1)
order by time_sent asc;