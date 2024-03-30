create database SPdemo
use SPdemo

create table user (uID int unsigned not null AUTO_INCREMENT,  firstN varchar(60), lastN varchar (60), uEmail varchar(60) UNIQUE, uPassword varchar(60), uPhone varchar(10) UNIQUE, primary key(uID));

create table Payment( pID int unsigned not null , uID int unsigned , cardNo int , cardCVV int , cardExDate date );
create table feedback(fID int unsigned not null auto_increment, uID int unsigned, fdate date, text varchar(150), primary key(fID), foreign key(uID) references user(uID) on update cascade);
create table vehicle(vID varchar(10)  not null auto_increment, uID int unsigned, make varchar(60), model varchar(60), color varchar(60), plate varchar(60), primary key(vID), foreign key(uID) references user(uID) on update cascade);
create table lot(lNo varchar(10) not null, location varchar(60), primary key(lNo));
create table user_lot(uID int unsigned, lNo varchar(10), date date, timein time, timeout time, price decimal(4,2), primary key(lNo, date, timein, timeout), foreign key(uID) references user(uID) on update cascade on delete set null, foreign key(lNo) references lot(lNo) on update cascade);

create table password_resets (id INT AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255) NOT NULL, token VARCHAR(255) NOT NULL, createdAt expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (email) REFERENCES user(uEmail));





insert into user values(1, "kim", "admin", "admin@admin", "password", "2131231643" );
insert into user values(2, "mike", "admin", "mike@admin", "123", "1234325432" );
