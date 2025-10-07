import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  // State variables
  const [topics, setTopics] = useState([]);
  // For managing selected topic and its questions.
  const [selectedTopic, setSelectedTopic] = useState(null);
  // For managing questions under the selected topic.
  const [questions, setQuestions] = useState([]);
  // For managing new topic/question forms.
  const [newTitle, setNewTitle] = useState("");
  // For managing new question body.
  const [newBody, setNewBody] = useState("");
  // For managing new topic name.
  const [newTopic, setNewTopic] = useState("");
  // For managing login/register forms.
  const [username, setUsername] = useState("");
  // For managing password input.
  const [password, setPassword] = useState("");
  // For managing first name input during registration.
  const [firstName, setFirstName] = useState("");
  // For managing last name input during registration.
  const [lastName, setLastName] = useState("");
  // For managing login state.
  const [loggedInUser, setLoggedInUser] = useState(null);
  // For toggling between login and register forms.
  const [showRegister, setShowRegister] = useState(false);
  // For managing replies.
  const [replyBodies, setReplyBodies] = useState({});
  // For managing replies state.
  const [replies, setReplies] = useState({});

  // Load topics on component mount.
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setLoggedInUser(savedUser);
  }, []);

  // Load topics on component mount.
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/topics")
      .then((res) => setTopics(res.data))
      .catch((err) => console.error("❌ Error loading topics:", err));
  }, []);

  // Handle topic selection and load questions for the selected topic.
  const handleTopicClick = (id) => {
    setSelectedTopic(id);
    axios
      .get("http://localhost:3001/api/questions?topic_id=" + id)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("❌ Error loading questions:", err));
  };

  // Handle user login.
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password.");
      return;
    }

    // Attempt login via API.
    axios
      .post("http://localhost:3001/api/login", { username, password })
      .then((res) => {
        if (res.data && res.data.username) {
          setLoggedInUser(res.data.username);
          localStorage.setItem("user", res.data.username);
        } else {
          alert("Login failed: Invalid response from server.");
        }
      })
      .catch((err) => {
        console.error("❌ Login failed:", err.response?.data || err.message);
        alert(
          "Login failed: " + (err.response?.data?.error || "Unknown error")
        );
      });
  };

  // Handle user registration.
  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password || !firstName || !lastName) {
      alert("Please fill in all fields.");
      return;
    }

    // Attempt registration via API.
    axios
      .post("http://localhost:3001/api/register", {
        username,
        password,
        first_name: firstName,
        last_name: lastName,
      })
      .then((res) => {
        alert(`✅ Registered as ${res.data.first_name} ${res.data.last_name}`);
        setLoggedInUser(res.data.username);
        localStorage.setItem("user", res.data.username);
      })
      .catch((err) => {
        alert(
          `❌ Registration failed: ${
            err.response?.data?.error || "Unknown error"
          }`
        );
      });
  };

  // Handle user logout.
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };

  // Handle new topic submission.
  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) {
      alert("Please enter a topic name.");
      return;
    }

    // Attempt to add a new topic via API.
    axios
      .post("http://localhost:3001/api/topics", { name: newTopic })
      .then((res) => {
        setTopics([...topics, res.data]);
        setNewTopic("");
      })
      .catch((err) => {
        console.error("❌ Error adding topic:", err);
        alert("Failed to add topic.");
      });
  };

  // Handle new question submission.
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) {
      alert("Please fill in both the title and body.");
      return;
    }

    // Attempt to submit a new question via API.
    axios
      .post("http://localhost:3001/api/questions", {
        topic_id: selectedTopic,
        title: newTitle,
        body: newBody,
        username: loggedInUser,
      })
      .then((res) => {
        console.log("✅ Question submitted:", res.data);
        setNewTitle("");
        setNewBody("");
        handleTopicClick(selectedTopic); // refresh questions
      })
      .catch((err) => console.error("❌ Error submitting question:", err));
  };

  //
  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
      {!loggedInUser ? (
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={() => setShowRegister((prev) => !prev)}
            style={{ marginBottom: "1rem" }}
          >
            {showRegister ? "Switch to Login" : "Switch to Register"}
          </button>

          {showRegister ? (
            <>
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                <button type="submit">Register</button>
              </form>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginRight: "0.5rem" }}
                />
                <button type="submit">Login</button>
              </form>
            </>
          )}
        </div>
      ) : (
        <div style={{ marginBottom: "2rem" }}>
          <p>
            Welcome, <strong>{loggedInUser}</strong>!
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Main forum interface. */}
      <h1>🧠 CodeCraft Forum</h1>
      <h2>Welcome to CodeCraft Forum!</h2>
      <p>
        Engage with the community by selecting a topic, adding topics,
        submitting questions, and exploring discussions.
      </p>

      {/* Show topic addition form only if logged in. */}
      {loggedInUser && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Add a New Topic for discussion</h2>
          <p>Enter a topic name to start a new discussion.</p>
          <form onSubmit={handleTopicSubmit}>
            <input
              type="text"
              placeholder="New topic name"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              style={{
                marginRight: "0.5rem",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <button type="submit">Add Topic</button>
          </form>
        </div>
      )}

      {/* Show topic selection */}
      <h2>Select a Topic</h2>
      <p>Select a topic to view related questions.</p>
      {topics.map((t) => (
        <button
          key={t.id}
          onClick={() => handleTopicClick(t.id)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
        >
          {t.name}
        </button>
      ))}

      {/* Show questions and submission form for selected topic */}
      {selectedTopic && loggedInUser && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Submit a Question</h2>
          <form onSubmit={handleQuestionSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{
                display: "block",
                marginBottom: "0.5rem",
                width: "100%",
              }}
            />

            {/* For managing new question body. */}
            <textarea
              placeholder="Body"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              style={{
                display: "block",
                marginBottom: "0.5rem",
                width: "100%",
                height: "100px",
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Show questions and submission form for selected topic */}
      <h2 style={{ marginTop: "2rem" }}>Questions</h2>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "1rem" }}>
          <h3>{q.title}</h3>
          <p>{q.body}</p>
          <small>
            Posted by <strong>{q.username}</strong> on{" "}
            {new Date(q.timestamp).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

// Export the main App component.
export default App;
