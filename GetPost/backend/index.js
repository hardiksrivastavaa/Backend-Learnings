const express = require("express");
const app = express();
const port = 1111;

// Middleware for parsing form data & JSON (Required for POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/register", (req, res) => {
    const { user, pass } = req.query; // GET request: Data from query parameters
    res.send(`Welcome to GET request Page! Dear User ${user}`);
});

app.post("/register", (req, res) => {
    const { user, pass } = req.body; // POST request: Data from body
    res.send(`Welcome to POST request Page! Dear User ${user}`);
});

app.listen(port, () => {
    console.log(`Server is listening on : ${port}`);
});
