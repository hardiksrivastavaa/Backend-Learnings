const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const port = 2020;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

cx

let tasks = [
    {
        id: uuidv4(),
        title: "Learn REST APIs",
        description: "Understand CRUD operations in REST APIs",
        completed: "false",
    },
    {
        id: uuidv4(),
        title: "Learn REST APIs",
        description: "Understand CRUD operations in REST APIs",
        completed: "true",
    },
];

app.get("/tasks", (req, res) => {
    res.render("tasks", { tasks });
});

app.get("/tasks/new", (req, res) => {
    res.render("new");
});

app.post("/tasks", (req, res) => {
    let id = uuidv4();
    let title = req.body.title;
    let description = req.body.description;
    let completed = req.body.completed ? "true" : "false";

    let task = { id, title, description, completed };
    tasks.push(task);
    res.redirect("/tasks");
});

app.get("/tasks/:id", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => id === t.id);
    res.render("show", { task });
});

app.get("/tasks/:id/edit", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => id === t.id);
    res.render("edit", { task });
});

app.patch("/tasks/:id", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => id === t.id);
    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed ? "true" : "false";
    res.redirect("/tasks");
});

app.delete("/tasks/:id", (req, res) => {
    let { id } = req.params;
    tasks = tasks.filter((t) => id !== t.id);
    res.redirect("/tasks");
});

app.listen(port, () => {
    console.log("Server is Listening On port : ", port);
});
