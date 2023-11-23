CREATE DATABASE expense_traker;
USE expense_traker;

CREATE TABLE exp_record (
    id INT UNIQUE NOT NULL AUTO_INCREMENT,
    amount INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255)
);

