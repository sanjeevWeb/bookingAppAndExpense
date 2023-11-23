CREATE DATABASE bookingApointment;
USE bookingApointment;


CREATE TABLE users(
    id int UNIQUE AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);