// Importing the Express framework
const express = require("express");

// Creating an instance of an Express application
const app = express();

// Importing the 'path' module to handle file paths
const path = require("path");

// Defining the port number for the server
const port = 3333;

// Setting EJS as the template engine
app.set("view engine", "ejs");

// Setting the directory where the views (EJS templates) are stored
app.set("views", path.join(__dirname, "/views"));

// Serving static files (CSS, JS, images) from the 'public' folder
app.use(express.static("public"));

// Route to handle Instagram profile lookup using dynamic username
app.get("/ig/:username", (req, res) => {
    // Extracting the username from the URL parameters
    let { username } = req.params;

    // Importing Instagram data from 'data.json'
    const instaData = require("./data.json");

    // Fetching user-specific data from 'data.json'
    const data = instaData[username];

    // If user data is found, render the Instagram profile page
    if (data) {
        res.render("instagram", { data });
    } else {
        // If user data is not found, render the error page
        res.render("error");
    }
});

// Starting the server and listening on the defined port
app.listen(port, (req, res) => {
    console.log("Server is Started.. Listening on port " + port);
});
