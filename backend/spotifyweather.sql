CREATE DATABASE IF NOT EXISTS spotifyweather;
USE spotifyweather;

DROP TABLE IF EXISTS Playlists CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50)
    );
    
CREATE TABLE Playlists (
    playlist_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id)
		REFERENCES Users (user_id)
        ON DELETE CASCADE,
	link VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    temp FLOAT,
    weather_condition VARCHAR(255),
    sentiment FLOAT
    );
    
-- INSERT INTO Users (user_id, email, password) VALUES (1, "tuckman@bu.edu", "spotify");
-- INSERT INTO Playlists (playlist_id, user_id, link) VALUES (1, 1, "google.com");
    