CREATE TABLE Parent (
    ParentID INT PRIMARY KEY REFERENCES Users(UserID),
    Occupation VARCHAR(100),
    Address TEXT,
    PhoneNumber VARCHAR(15) UNIQUE
);
