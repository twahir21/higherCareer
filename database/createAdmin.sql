CREATE TABLE Admin (
    AdminID INT PRIMARY KEY REFERENCES Users(UserID),
    Position VARCHAR(50),
    Permissions JSON NOT NULL
);
