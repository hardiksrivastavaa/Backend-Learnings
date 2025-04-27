const express = require("express");
const app = express();
const port = 8888;
const ExpressError = require("./ExpressError.js");

// const checkToken = ((req, res, next) => {
//     const { token } = req.query;
//     if (token === "hardik") {
//         next();
//     } else {
//         res.status(401).send("Unauthorized access! Please provide a valid token.");
//     }
// });

const checkToken = ((req, res, next) => {
    const { token } = req.query;
    if (token === "hardik") {
        next();
    }
    throw new ExpressError("Unauthorized access! Please provide a valid token.", 401);
});

app.get("/", (req, res) => {
    res.send(`Welcome to root Page!`);
});

app.get("/admin", checkToken, (req, res) => {
    res.send(`Welcome to Hardik's admin Page!`);
});

// app.get("/error", (req, res) => {
//     abc == abc;
// });

app.get("/sir", (req, res) => {
    throw new ExpressError("Access is forbidden", 403);
});

app.use((err, req, res, next) => {
    console.log("Error Handler Middleware Called!");
    let {statusCode=500, message="Some Error Occured"} = err;
    res.status(statusCode).send(message);
});








app.listen(port, () => {
    console.log(`Server is listening on : ${port}`);
});
