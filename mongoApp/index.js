const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

const methodOverride = require("method-override");

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
    .then((res) => console.log("DB Connected Successfully!"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/InstagramDB");
}

app.get("/", (req, res) => {
    res.send("App is working");
});

app.get("/chats", async (req, res) => {
    let chats = await Chat.find({});
    res.render("chats", { chats: chats });
});

app.get("/chats/new", (req, res) => {
    res.render("new");
});

app.post("/chats/new", (req, res) => {
    let chat = new Chat({
        to: req.body.to,
        from: req.body.from,
        msg: req.body.msg,
        created_at: new Date(),
    });
    Chat.insertOne(chat)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
    res.redirect("/chats");
});

app.get("/chats/:id", async (req, res) => {
    let chat = await Chat.findById(req.params.id);
    res.render("show", { chat: chat });
});

app.get("/chats/:id/edit", async (req, res) => {
    let chat = await Chat.findById(req.params.id);
    res.render("edit", { chat: chat });
    console.log(chat.to);
});

app.patch("/chats/:id/edit", async (req, res) => {
    await Chat.findByIdAndUpdate(req.params.id, {
        to: req.body.to,
        from: req.body.from,
        msg: req.body.msg,
        edited_at: new Date(),
    },
        {
            runValidators: true,
            new: true,
        });
    res.redirect("/chats");
});

app.delete("/chats/:id/delete", async (req, res) => {
    await Chat.findByIdAndDelete(req.params.id);
    res.redirect("/chats");
});

app.listen(8080, () => {
    console.log("Server is Listening on port 8080");
});
