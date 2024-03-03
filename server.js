const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

require("dotenv").config();
require("./config/database");
const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

//API routes here
app.use("/api/users", require("./routes/api/users"));

app.use(require("./config/auth"));
// all routes below will have access to req.user
app.use("/api/user", require("./routes/api/user"));

app.use("/api/projects", require("./routes/api/projects"));
app.use("/api/meetings", require("./routes/api/meetings"));

app.use("/api/tasks", require("./routes/api/tasks"));
app.use("/api/comments", require("./routes/api/comments"));
app.use("/api/todos", require("./routes/api/todos"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
