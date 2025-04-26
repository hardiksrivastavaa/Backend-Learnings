const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
    .then((res) => console.log("DB Connected Successfully!"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/InstagramDB");
}

let allChats = [
    { from: "John", to: "Doe", msg: "Hello Doe!", created_at: new Date() },
    { from: "Alice", to: "Bob", msg: "How are you?", created_at: new Date() },
    { from: "Charlie", to: "Eve", msg: "What's up?", created_at: new Date() },
    { from: "Bob", to: "Alice", msg: "Good morning!", created_at: new Date() },
    { from: "Eve", to: "Charlie", msg: "See you later!", created_at: new Date() },
    { from: "Doe", to: "John", msg: "Take care!", created_at: new Date() },
    { from: "Alice", to: "Charlie", msg: "Hello there!", created_at: new Date() },
    { from: "John", to: "Eve", msg: "How's it going?", created_at: new Date() },
    { from: "Charlie", to: "Doe", msg: "Catch you soon!", created_at: new Date() },
    { from: "Bob", to: "John", msg: "Have a great day!", created_at: new Date() },
];


Chat.insertMany(allChats);