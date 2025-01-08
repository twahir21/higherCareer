CREATE TABLE Notifications (
    NotificationID SERIAL PRIMARY KEY,
    UserID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    Message TEXT NOT NULL,
    Status VARCHAR(10) CHECK (Status IN ('Sent', 'Read', 'Failed')) DEFAULT 'Sent',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
