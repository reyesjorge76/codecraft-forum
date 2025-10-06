INSERT INTO topics (name) VALUES ('JavaScript'), ('Python'), ('React');

INSERT INTO users (username, password) VALUES ('alice', 'password123'), ('bob', 'secure456');

INSERT INTO questions (user_id, topic_id, title, body) VALUES
(1, 1, 'How do closures work in JS?', 'Can someone explain closures with an example?'),
(2, 2, 'What is a Python decorator?', 'I’m confused about how decorators modify functions.');

INSERT INTO answers (question_id, user_id, body) VALUES
(1, 2, 'Closures are functions that remember variables from their lexical scope.'),
(2, 1, 'Decorators wrap a function and can modify its behavior.');


INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'admin123');