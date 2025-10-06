const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcrypt");

const dbPath = path.join(__dirname, "db", "codecraft.db");
const db = new sqlite3.Database(dbPath);
const saltRounds = 10;
const plainPassword = "admin123";

// Initialize and seed the database.
db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS users`);
  db.run(`DROP TABLE IF EXISTS topics`);
  db.run(`DROP TABLE IF EXISTS questions`);

  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      first_name TEXT,
      last_name TEXT
    )
  `);

  db.run(`
    CREATE TABLE topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_id INTEGER,
      title TEXT,
      body TEXT,
      username TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (topic_id) REFERENCES topics(id)
    )
  `);

  // Seed topics table.
  const topics = ["JavaScript", "Python", "React"];
  const insertTopic = db.prepare(`INSERT INTO topics (name) VALUES (?)`);
  topics.forEach((topic) => insertTopic.run(topic));
  insertTopic.finalize();

  bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) {
      console.error("❌ Error hashing password:", err);
      db.close();
      return;
    }

    db.run(
      `INSERT INTO users (username, password, first_name, last_name) VALUES (?, ?, ?, ?)`,
      ["admin", hash, "Admin", "User"],
      (err) => {
        if (err) {
          console.error("❌ Error inserting user:", err.message);
        } else {
          console.log("✅ Admin user seeded");
        }

        db.all(`SELECT * FROM topics`, [], (err, rows) => {
          console.log("📚 Topics:", rows);
          db.close();
        });
      }
    );
  });
});

// Seed replies table
db.run(`
  CREATE TABLE replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER,
    body TEXT,
    username TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id)
  )
`);

const insertQuestion = db.prepare(`
  INSERT INTO questions (topic_id, title, body, username)
  VALUES (?, ?, ?, ?)
`);

insertQuestion.run(
  1,
  "How do I declare a variable in JavaScript?",
  "I'm new to JS and wondering about let vs var.",
  "admin"
);
insertQuestion.run(
  2,
  "What's the difference between a list and tuple?",
  "Trying to understand Python data structures.",
  "admin"
);
insertQuestion.run(
  3,
  "How do I use useEffect in React?",
  "I want to fetch data when the component mounts.",
  "admin"
);

insertQuestion.finalize();
