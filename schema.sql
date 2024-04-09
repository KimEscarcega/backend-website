create database SPdemo
use SPdemo

create table user (uID int unsigned not null AUTO_INCREMENT,  firstN varchar(60), lastN varchar (60), uEmail varchar(60) UNIQUE, uPassword varchar(60), uPhone varchar(10) UNIQUE, primary key(uID));
create table vehicle(vID int unsigned not null auto_increment, uID int unsigned, make varchar(60), model varchar(60), color varchar(60), plate varchar(60), primary key(vID), foreign key(uID) references user(uID) on update cascade);
create table feedback(fID int unsigned not null auto_increment, uID int unsigned, fdate date, text varchar(150), primary key(fID), foreign key(uID) references user(uID) on update cascade);
create table report(rID int unsigned not null auto_increment, uID int unsigned, rdate date, rconfirmedStartTime time, rconfirmedEndTime time, roccupiedTime time, rspot varchar(15), rlicense varchar(15), primary key(rID), foreign key(uID) references user(uID) on update cascade);
create table lot(lID int unsigned not null  AUTO_INCREMENT, lNo int, location varchar(60), primary key(lID));
CREATE TABLE user_lot (uID INT UNSIGNED,lID INT UNSIGNED NOT NULL,date DATE,timein TIME,timeout TIME,price DECIMAL(4,2), PRIMARY KEY (lID, date, timein, timeout),FOREIGN KEY (uID) REFERENCES user(uID) ON UPDATE CASCADE ON DELETE SET NULL,FOREIGN KEY (lID) REFERENCES lot(lID) ON UPDATE CASCADE);
CREATE TABLE password_resets (id INT AUTO_INCREMENT PRIMARY KEY, uEmail VARCHAR(60) NOT NULL, token VARCHAR(255) NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, expires_at TIMESTAMP DEFAULT NULL,FOREIGN KEY (uEmail) REFERENCES user(uEmail));
create table payment( pID int unsigned not null AUTO_INCREMENT, uID int unsigned , cardNo varchar(16) , cardCVV int , cardExDate varchar(4),zipCode int, primary key(pID),foreign key(uID)references user(uID) );










insert into user values(1, "kim", "admin", "admin@admin", "password", "2131231643" );
insert into user values(2, "mike", "admin", "mike@admin", "123", "1234325432" );



insert into lot values (1,1, "UNTD");
insert into lot values (2,2,"UNTD");
insert into lot values (3,3,"UNTD");
insert into lot values (4,4,"UNTD");
insert into lot values (5,5,"UNTD");
insert into lot values (6,6,"UNTD");
insert into lot values (7,7,"UNTD");
insert into lot values (8,8,"UNTD");
insert into lot values (9,9,"UNTD");
insert into lot values (10,10,"UNTD");
insert into lot values (11,11,"UNTD");
insert into lot values (12,12,"UNTD");
insert into lot values (13,13,"UNTD");
insert into lot values (14,14,"UNTD");
insert into lot values (15,15,"UNTD");
insert into lot values (16,16,"UNTD");
insert into lot values (17,17,"UNTD");
insert into lot values (18,18,"UNTD");
insert into lot values (19,19,"UNTD");
insert into lot values (20,20,"UNTD");
