CREATE TABLE User (
	UserId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName varchar(255),
    LastName varchar(255),
    Email varchar(255),
    Birthday Date,
    City varchar(255)
    );
    
CREATE TABLE Ngo (
	NgoId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name varchar(255),
    Cnpj varchar(20),
    Email varchar(255),
    City varchar(255)
    );

CREATE TABLE Job (
	JobId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NgoId int,
    Title varchar(255),
    Remote boolean,
    Description varchar(1000),
    FOREIGN KEY (NgoId) REFERENCES Ngo(NgoId)
    );

CREATE TABLE User_Job (
	UserId int,
    JobId int,
    PRIMARY KEY (UserId, JobId),
    FOREIGN KEY (UserId) REFERENCES User(UserId),
    FOREIGN KEY (JobId) REFERENCES Job(JobId)
    );
    
CREATE TABLE followers (
	UserId int,
    NgoId int,
    PRIMARY KEY (UserId, NgoId),
    FOREIGN KEY (UserId) REFERENCES User(UserId),
    FOREIGN KEY (NgoId) REFERENCES Ngo(NgoId)
    );
    