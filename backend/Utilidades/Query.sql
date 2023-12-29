CREATE DATABASE StudentPortalDB

GO

USE StudentPortalDB

-------- NATIONALITY------------
CREATE TABLE StudentPortalDB.dbo.Nationality(
id int primary key identity(1,1),
Title varchar(50)
)

insert into StudentPortalDB.dbo.Nationality(Title) values
('Pakistan'),
('UAE'),
('USA')

SELECT * FROM StudentPortalDB.dbo.Nationality

--------------STUDENT--------
CREATE TABLE StudentPortalDB.dbo.Student(
ID int primary key identity(1,1),
firstName varchar(50),
lastName varchar(50),
dateOfBirth Date,
nationalID int
);

insert into StudentPortalDB.dbo.Student
(firstName,lastName,dateOfBirth,nationalID) values
('Muhammad','Waqar', '1995-12-25' , 1);

SELECT * FROM StudentPortalDB.dbo.Student;

-----------FAMILY MEMBER-----------
CREATE TABLE StudentPortalDB.dbo.FamilyMember(
ID int primary key identity(1,1),
firstName varchar(50),
lastName varchar(50),
dateOfBirth Date,
relationship varchar(50),
nationalID int,
studentID int,
FOREIGN KEY (studentID) REFERENCES StudentPortalDB.dbo.Student(ID)
);

insert into StudentPortalDB.dbo.FamilyMember
(firstName,lastName,dateOfBirth,relationship,nationalID,studentID) values
('Muhammad','Wajid', '1970-12-25' , 'Parent', 1, 1);

SELECT * FROM StudentPortalDB.dbo.FamilyMember;