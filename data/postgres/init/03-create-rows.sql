\connect accounts

INSERT INTO users (
  username,
  password,
  email,
  firstname,
  lastname
)
VALUES
('testuser1', 'fastfit', 'fastfit@example.com', 'fast', 'fit');

\connect recipes

INSERT INTO uservo (
  usernamevo
)
VALUES
('testuser1');

\connect workouts

INSERT INTO uservo (
  usernamevo
)
VALUES
('testuser1');

\connect journals

INSERT INTO uservo (
  usernamevo
)
VALUES
('testuser1');

\connect health

INSERT INTO uservo (
  usernamevo,
  heightvo
)
VALUES
('testuser1', 68);