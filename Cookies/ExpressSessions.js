const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const e = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "fsdsfsfsfsgrwewg",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());


app.use((req, res, next) => {
    res.locals.successMessage = req.flash("success");
    res.locals.errorMessage = req.flash("error");
    next();
})

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;

    if (name === "anonymous") {
        req.flash("error", "User Not Registerd!");
    } else {
        req.flash("success", "User Registerd Successfully!");
    }

    req.session.name = name;
    res.redirect("/hello");
})


app.get("/hello", (req, res) => {
    res.render("page.ejs", { name: req.session.name });
})


























































// app.get("/reqcount", (req, res) => {

//     if (req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`You send a request ${req.session.count} times`);

// })

// app.get("/test", (req, res) => {
//     res.send("Test Successfull");
// })

app.listen(1111, () => {
    console.log(`Server is listening on : 1111`);
});
