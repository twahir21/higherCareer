CREATE TABLE Teacher (
    id serial PRIMARY KEY not null,
    username varchar(50) unique not null,
    email varchar(255) not null,
    tel varchar(20),
    SubjectTaught VARCHAR(100) NOT NULL,
    Qualifications VARCHAR(50),
    role varchar(50),
    pswd varchar(255) not null
);
