Final Project 4 for full stack developer bootcamp through CMU.

Code Location link: https://github.com/reyesjorge76/codecraft-forum

📘 CodeCraft Forum
A 3-Tier web application where users can register, log in, and ask or answer questions about programming topics like JavaScript, Python, and React.

🧱 Architecture Overview

- Frontend (React SPA): Interactive UI for browsing topics, posting questions, and viewing answers.
- Backend (Node.js + Express): JSON API for authentication, topic/question/answer management.
- Database (SQLite): Stores users, topics, questions, and answers.

🚀 Getting Started

1. Setup the Database
   cd backend/db
   sqlite3 codecraft.db < schema.sql
   sqlite3 codecraft.db < seed.sql

2. Start the Backend Server
   cd ../backend
   npm install
   node server.js

Runs at: http://localhost:3001 4. Start the Frontend
cd ../../frontend
npm install
npm start

Runs at: http://localhost:3000

📂 File Structure
codecraft-forum/
├── backend/
│ ├── db/ # SQLite schema and seed
│ ├── routes/ # Modular Express routes
│ └── server.js # API entry point
├── frontend/
│ ├── src/components/ # React components
│ ├── App.jsx # Main app logic
│ └── api.js # Axios API calls
└── README.md

🔐 API Endpoints
| | | |
| | /api/register | |
| | /api/login | |
| | /api/topics | |
| | /api/questions/:topicId | |
| | /api/questions | |
| | /api/answers/:questionId | |
| | /api/answers | |

🧪 Demo Credentials
Username: admin
Password: admin123

🛠️ Tech Stack

- Frontend: React, Axios
- Backend: Node.js, Express.js
- Database: SQLite
- Dev Tools: VS Code, Postman, SQLite CLI

📌 Future Enhancements

- JWT-based authentication
- Topic hierarchy and tagging
- Markdown support for questions/answers
- Upvotes and accepted answers
