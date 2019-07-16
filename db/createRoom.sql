insert into rooms
    (first_email, second_email, room_name)
values
    ($1, $2, $3);

select *
from rooms
where first_email = $1;