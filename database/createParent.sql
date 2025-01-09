CREATE TABLE Parent (
    ParentID INT PRIMARY KEY REFERENCES Users(UserID),
    Relation_Student VARCHAR(100),
    Student_name VARCHAR (30),
    Student_Class VARCHAR(50)
);
