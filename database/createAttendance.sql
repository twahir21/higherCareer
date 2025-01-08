CREATE TABLE Attendance (
    AttendanceID SERIAL PRIMARY KEY,
    StudentID INT REFERENCES Students(StudentID) ON DELETE CASCADE,
    ClassID INT REFERENCES Classes(ClassID) ON DELETE CASCADE,
    Date DATE NOT NULL,
    Status VARCHAR(10) CHECK (Status IN ('Present', 'Absent', 'Late')) NOT NULL
);
