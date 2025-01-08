CREATE TABLE Teacher (
    TeacherID INT PRIMARY KEY REFERENCES Users(UserID),
    SubjectSpecialty VARCHAR(100) NOT NULL,
    Qualifications TEXT,
    PhoneNumber VARCHAR(15) UNIQUE
);
