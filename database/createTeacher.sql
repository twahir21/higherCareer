CREATE TABLE Teacher (
    TeacherID INT PRIMARY KEY REFERENCES Users(UserID),
    SubjectTaught VARCHAR(100) NOT NULL,
    Qualifications VARCHAR(50)
);
