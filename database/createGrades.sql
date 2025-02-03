CREATE TABLE Grades (
    GradeID SERIAL PRIMARY KEY,
    StudentID INT REFERENCES Students(StudentID) ON DELETE CASCADE,
    SubjectID INT REFERENCES Subjects(SubjectID) ON DELETE CASCADE,
    Grade DECIMAL(5, 2) NOT NULL,
    AssessmentType VARCHAR(15) CHECK (AssessmentType IN ('Exam', 'Quiz', 'Assignment')) NOT NULL,
    DateRecorded TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
