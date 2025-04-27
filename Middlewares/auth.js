const express = require("express");
const app = express();
const port = 8888;

const checkToken = ((req, res, next) => {
    const { token } = req.query;
    if (token === "hardik") {
        next();
    } else {
        res.status(401).send("Unauthorized access! Please provide a valid token.");
    }
});

app.get("/", (req, res) => {
    res.send(`Welcome to root Page!`);
});

app.get("/admin", checkToken, (req, res) => {
    res.send(`Welcome to Hardik's admin Page!`);
});














app.listen(port, () => {
    console.log(`Server is listening on : ${port}`);
});
