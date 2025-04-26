const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

let posts = [
    {
        id: uuidv4(),
        name: "Hardik Srivastava",
        role: "Full Stack Web Developer",
        age: 20,
    },
    {
        id: uuidv4(),
        name: "Niyam Srivastava",
        role: "AI Engineer",
        age: 24,
    },
    {
        id: uuidv4(),
        name: "Kaushik Srivastava",
        role: "Product Manager",
        age: 30,
    },
    {
        id: uuidv4(),
        name: "Ankit Srivastava",
        role: "HR Expert",
        age: 34,
    },
    {
        id: uuidv4(),
        name: "Vibhu Srivastava",
        role: "Assistant Professor",
        age: 38,
    },
    {
        id: uuidv4(),
        name: "Shailja Srivastava",
        role: "Voiceover Artist",
        age: 35,
    },
];

app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
    let { name, role, age } = req.body;
    let id = uuidv4();
    posts.push({ id, name, role, age });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newAge = req.body.age;
    let post = posts.find((p) => id === p.id);
    post.age = newAge;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("Server is listening on the port : ", port);
});
