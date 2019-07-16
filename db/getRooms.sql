select *
from rooms
where first_email = $1 or second_email = $1;