<<<<<<< HEAD
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
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> e29918c (Initialize project using Create React App)
