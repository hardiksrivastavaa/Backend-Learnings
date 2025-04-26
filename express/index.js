const express = require("express");
const app = express();
const port = 8353;
const path = require("path");

// this to used to set the view engine as ejs
app.set("view engine", "ejs");
// path set krne se views ko hum kahin se bhi access kr skte h
app.set("views", path.join(__dirname, "/views"));

// This is used to parse and make readable the urlencoded data send via post or other request to req.body
app.use(express.urlencoded({ extended: true }));
// This is used to parse and make readable the json data send via post or other request to req.body
app.use(express.json());

// ----------------------------------------------------------------------------------------------
// app.listen is used to listen the requests to specific port from the client side
// ----------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`app is listening on the port : ${port}`);
});

// ----------------------------------------------------------------------------------------------
// app.use is used to send response to all the paths
// ----------------------------------------------------------------------------------------------

// app.use((req, res) => {
//     console.log("request Recieved");
//     let code = "<h1>Sending first HTML Response!</h1>";
//     res.send(code);
// })

// ----------------------------------------------------------------------------------------------
// app.get is used to send response on a specific decided path
// ----------------------------------------------------------------------------------------------

// app.get("/home", (req, res) => {
//     res.send("you contacted home path");
// })

// app.get("/contact", (req, res) => {
//     res.send("you contacted contact path");
// })

// app.get("/services", (req, res) => {
//     res.send("you contacted service path");
// })

// app.post("/ss", (req, res) => {
//     res.send("you contacted post service path");
// })

// app.get("/service/fingering", (req, res) => {
//     res.send("you contacted service/fingering path");
// })

// app.get("*", (req, res) => {
//     res.send("<h1>this path does not exists!!</h1>");
// })

// ----------------------------------------------------------------------------------------------
// app.get("/:username/:id") is used to send request to a specific id or username
// ----------------------------------------------------------------------------------------------

// app.get("/:username/:id", (req, res) => {
//     let { username, id } = req.params;
//     res.send(`<h1>Hello Dear ${username}, your id is : ${id}</h1>`);
// })

// ----------------------------------------------------------------------------------------------
// app.get("/search?q="apple") is used to send query request
// ----------------------------------------------------------------------------------------------

app.get("/search", (req, res) => {
    let { q } = req.query;
    if (!q) {
        res.send("<h1>you have not searched any thing bro</h1>");
    }
    res.send(`<h1>you have search something my bro : ${q}</h1>`);
});
