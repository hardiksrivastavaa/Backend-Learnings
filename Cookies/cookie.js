const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser("secretCode"));

app.get("/sendSignedCookies", (req, res) => {
    res.cookie("Country", "India", { signed: true });
    res.send("Cookies Sent!");
})

app.get("/verifySignedCookies", (req, res) => {
    console.log(req.signedCookies);
    res.send("Verified");
})  

app.get("/getCookies", (req, res) => {
    res.cookie("greet", "Namaste Sir!");
    res.send("Cookie Sent!");
})

app.get("/", (req, res) => {
    let { greet = "Vadakam Sir" } = req.cookies;
    res.send(`Hey, ${greet}`);
})

app.listen(1111, () => {
    console.log(`Server is listening on : 1111`);
});
