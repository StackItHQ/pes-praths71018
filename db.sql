CREATE DATABASE SuperJoin;
USE SuperJoin;

CREATE TABLE my_table (
    slno INT PRIMARY KEY,
    name VARCHAR(100)
);

ALTER TABLE my_table MODIFY slno INT AUTO_INCREMENT;

INSERT INTO my_table VALUES (10,"rajdeep")