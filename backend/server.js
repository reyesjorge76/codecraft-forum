const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const PORT = 3001;
const dbPath = path.join(__dirname, "db", "codecraft.db");
const db = new sqlite3.Database(dbPath);

app.use(cors());
app.use(express.json());

// 🔐 Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) return res.status(500).json({ error: "Login failed" });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json({ error: "Login failed" });
      if (!result)
        return res.status(401).json({ error: "Invalid credentials" });

      res.json({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    });
  });
});

// 🧾 Registration route
app.post("/api/register", (req, res) => {
  const { username, password, first_name, last_name } = req.body;
  if (!username || !password || !first_name || !last_name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    (err, existingUser) => {
      if (err) return res.status(500).json({ error: "Registration failed" });
      if (existingUser)
        return res.status(409).json({ error: "Username already exists" });

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: "Registration failed" });

        db.run(
          `INSERT INTO users (username, password, first_name, last_name) VALUES (?, ?, ?, ?)`,
          [username, hash, first_name, last_name],
          (err) => {
            if (err)
              return res.status(500).json({ error: "Registration failed" });
            res.json({ username, first_name, last_name });
          }
        );
      });
    }
  );
});

// 📚 Get all topics.
app.get("/api/topics", (req, res) => {
  db.all(`SELECT * FROM topics`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to load topics" });
    res.json(rows);
  });
});

// 📚 Add a new topic.
app.post("/api/topics", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Topic name required" });

  db.run(`INSERT INTO topics (name) VALUES (?)`, [name], function (err) {
    if (err) return res.status(500).json({ error: "Failed to add topic" });
    res.json({ id: this.lastID, name });
  });
});

// 📝 Submit a question
app.post("/api/questions", (req, res) => {
  const { topic_id, title, body, username } = req.body;
  if (!topic_id || !title || !body || !username) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.run(
    `INSERT INTO questions (topic_id, title, body, username) VALUES (?, ?, ?, ?)`,
    [topic_id, title, body, username],
    (err) => {
      if (err)
        return res.status(500).json({ error: "Failed to submit question" });
      res.json({ success: true });
    }
  );
});

// 📥 Get all questions by topic names
app.get("/api/questions", (req, res) => {
  const topicId = req.query.topic_id;

  let query = `
    SELECT q.id, q.title, q.body, q.username, q.timestamp, t.name AS topic
    FROM questions q
    JOIN topics t ON q.topic_id = t.id
  `;
  const params = [];

  if (topicId) {
    query += ` WHERE q.topic_id = ?`;
    params.push(topicId);
  }

  query += ` ORDER BY q.timestamp DESC`;

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to load questions" });
    res.json(rows);
  });
});

// 💬 Submit a reply.
app.post("/api/replies", (req, res) => {
  const { question_id, body, username } = req.body;
  if (!question_id || !body || !username) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.run(
    `INSERT INTO replies (question_id, body, username) VALUES (?, ?, ?)`,
    [question_id, body, username],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to submit reply" });
      res.json({ success: true });
    }
  );
});

// 💬 Get all replies for a question.
app.get("/api/replies", (req, res) => {
  const { question_id } = req.query;
  if (!question_id)
    return res.status(400).json({ error: "Missing question_id" });

  db.all(
    `SELECT * FROM replies WHERE question_id = ? ORDER BY timestamp ASC`,
    [question_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Failed to load replies" });
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
