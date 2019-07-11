delete from messages where sender = $1 and message_id = $2;

select u.email, m.content, m.time_sent, m.sender, m.reciever, m.message_id
from users u
    join messages m on u.user_id = m.sender
where sender = $1 or reciever = $1;