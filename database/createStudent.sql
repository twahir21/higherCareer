CREATE TABLE Students (
    StudentID SERIAL PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    DateOfBirth DATE NOT NULL,
    ParentID INT REFERENCES Parent(ParentID) ON DELETE CASCADE,
    TeacherID INT REFERENCES Teacher(TeacherID),
    Class VARCHAR(50) NOT NULL
);
