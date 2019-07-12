insert into messages
    (content, time_sent, sender, reciever)
values
    ($1, $2, $3, $4);


select u.email, m.content, m.time_sent, m.sender, m.reciever, m.message_id
from users u
    join messages m on u.user_id = m.sender
where sender = $3 or reciever = $3;