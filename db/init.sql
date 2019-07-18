create table posts
(
    post_id serial primary key,
    content text,
    time_entered text,
    user_id integer references users(user_id)
);

create table users
(
    user_id serial primary key,
    email text,
    first varchar(24),
    last varchar(24),
    title varchar(64),
    developer boolean,
    linkedin text,
    portfolio text,
    profile_pic text,
    password text
);

create table skills
(
    skill_id serial primary key,
    skill_name varchar(64),
    icon text
);

create table messages
(
    message_id serial primary key,
    content varchar(200),
    time_sent text,
    sender integer references users(user_id),
    reciever integer references users(user_id)
);

create table postlikes
(
    post_id integer references posts(post_id),
    user_id integer references users(user_id)
);

create table following
(
    user_id integer references users(user_id),
    followed integer
    []
);

    create table hasskills
    (
        user_id integer references users(user_id),
        skills integer
        []
);

        create table rooms
        (
            room_id serial primary key,
            first_email text not null,
            second_email text not null,
            room_name text not null
        );