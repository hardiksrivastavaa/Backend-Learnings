const express = require("express");
const app = express();
const port = 5555;
const path = require("path");

app.set("view engine", "ejs");
// path set krne se views ko hum kahin se bhi access kr skte h 
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/ig/:username", (req, res) => {
    const followers = ["Hardik", "Akhilesh", "Nikhil", "Hardik"];
    let { username } = req.params;
    res.render("insta.ejs", { username, followers});
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/service", (req, res) => {
    res.render("service");
})

app.get("/dice", (req, res) => {
    let diceValue = Math.floor(Math.random() * 6 + 1);
    res.render("dice.ejs", { num: diceValue });
})

// app.post("/form", (req, res) => {
//     let { name, pass } = req.query;
//     res.send(`Hi @${name}, your password is : ${pass}`);
// })

app.listen(port, () => {
    console.log(`Server Started!! Server is listening on : ${port}`);
})

