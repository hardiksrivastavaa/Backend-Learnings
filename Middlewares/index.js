const express = require("express");
const app = express();
const port = 8888;


// Middleware function to log request details
app.use((req, res, next) => {

    console.log(`Request Method: ${req.method}, Request URL: ${req.url}, Request Time: ${new Date().toISOString()}, Request IP: ${req.ip}`);
    next(); // Call the next middleware or route handler
});


app.get("/", (req, res) => {
    res.send(`Welcome to root Page!`);
});

app.get("/admin", (req, res) => {
    res.send(`Welcome to admin Page!`);
});

app.listen(port, () => {
    console.log(`Server is listening on : ${port}`);
});
