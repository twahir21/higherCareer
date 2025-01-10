CREATE TABLE Parent (
    id serial PRIMARY KEY,
    username varchar(50) unique not null,
    email varchar(255) not null,
    tel varchar(20),
    Relation_Student VARCHAR(100),
    Student_name VARCHAR (30),
    Student_Class VARCHAR(50),
    role varchar(50),
    pswd varchar(255) not null
);
