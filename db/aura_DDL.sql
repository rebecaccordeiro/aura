CREATE TABLE User (
	UserId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName varchar(255),
    LastName varchar(255),
    Email varchar(255),
    Birthday Date,
    City varchar(255),
    PhoneNumber varchar(20)
    );
    
CREATE TABLE Ngo (
	NgoId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name varchar(255),
    Cnpj varchar(20),
    Email varchar(255),
    AddressStreet varchar(255),
    AddressNumber int,
    AddressComplement varchar(55),
    ZipCode int,
    City varchar(255),
    PhoneNumber varchar(20)
    );

CREATE TABLE Job (
	JobId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NgoId int,
    Title varchar(255),
    Remote boolean,
    AddressStreet varchar(255),
    AddressNumber int,
    AddressComplement varchar(55),
    ZipCode int,
    Vacancies int,
    Active boolean,
    Description varchar(1000),
    FOREIGN KEY (NgoId) REFERENCES Ngo(NgoId)
    );

CREATE TABLE Category (
	CategoryId int NOT NULL PRIMARY KEY,
	Name varchar(25)
    );
    
CREATE TABLE Cause (
	CauseId int NOT NULL PRIMARY KEY,
    Name varchar(25)
    );

CREATE TABLE User_Category (
	UserId int,
	CategoryId int,
    PRIMARY KEY (UserId, CategoryId),
	FOREIGN KEY (UserId) REFERENCES User(UserId),
    FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
    );

CREATE TABLE Job_Category (
	JobId int,
    CategoryId int,
    PRIMARY KEY (JobId, CategoryId),
    FOREIGN KEY (JobId) REFERENCES Job(JobId),
    FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
    );

CREATE TABLE User_Job (
	UserId int,
    JobId int,
    PRIMARY KEY (UserId, JobId),
    FOREIGN KEY (UserId) REFERENCES User(UserId),
    FOREIGN KEY (JobId) REFERENCES Job(JobId)
    );

CREATE TABLE User_Cause (
	UserId int,
    CauseId int,
    PRIMARY KEY (UserId, CauseId),
    FOREIGN KEY (UserId) REFERENCES User(UserId),
    FOREIGN KEY (CauseId) REFERENCES Cause(CauseId)
    );

CREATE TABLE Job_Cause (
	JobId int,
    CauseId int,
    PRIMARY KEY (JobId, CauseId),
    FOREIGN KEY (JobId) REFERENCES Job(JobId),
    FOREIGN KEY (CauseId) REFERENCES Cause(CauseId)
    );
    