CREATE DATABASE IF NOT EXISTS spotifyweather;
USE spotifyweather;

DROP TABLE IF EXISTS Playlists CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users (
--     user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(50)
    );
    
CREATE TABLE Playlists (
    playlist_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    FOREIGN KEY (email)
        REFERENCES Users (email)
        ON DELETE CASCADE,
    link VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    temp FLOAT,
    weather_condition VARCHAR(255),
    sentiment FLOAT
    );
    
-- INSERT INTO Users (user_id, email, password) VALUES (1, "tuckman@bu.edu", "spotify");
-- INSERT INTO Playlists (playlist_id, user_id, link) VALUES (1, 1, "google.com");
    
