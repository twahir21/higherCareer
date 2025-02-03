CREATE TABLE Events (
    EventID SERIAL PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    Description TEXT,
    EventDate TIMESTAMP NOT NULL,
    CreatedBy INT REFERENCES Users(UserID) ON DELETE SET NULL
);
