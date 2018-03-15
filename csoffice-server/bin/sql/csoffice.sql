CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstName character varying(50) NOT NULL,
  lastName character varying(50) NOT NULL,
  password character varying(50) NOT NULL,
  email character varying(50) NOT NULL,
  isAdmin boolean
);

INSERT INTO users(firstName, lastName, password, email, isAdmin)
VALUES('Star', 'Washington', 'ilovetesting', 'start@star.com', true);
