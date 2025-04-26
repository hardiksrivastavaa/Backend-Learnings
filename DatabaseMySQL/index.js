const express = require("express");
const app = express();
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "deltadb",
    password: "Rajneesh@1928",
});

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

app.get("/", (req, res) => {
    let q = `select count(*) from user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = result[0]["count(*)"];
            res.render("home", { count });
        });
    } catch (err) {
        console.log(err);
        res.send("error in db");
    }
});

app.get("/users", (req, res) => {
    let q = `Select * from user`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            res.render("users", { users });
        });
    } catch (err) {
        console.log(err);
        res.send("error in db");
    }
});

app.get("/users/new", (req, res) => {
    res.render("new");
});

app.post("/users", (req, res) => {
    let { username, email, password } = req.body;
    let newID = uuidv4();
    let q = `Select * from user where email="${email}" OR username="${username}"`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            if (!result.length) {
                let q2 = `insert into user (id, username, email, password) values ("${newID}", "${username}", "${email}", "${password}")`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    res.redirect("/users");
                });
            } else {
                res.status(400).send("the entered email Or username is already exists!!");
            }
        });
    } catch (error) {
        console.log(err);
        res.send("error in db");
    }
});

// edit route

app.get("/users/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `Select * from user where id="${id}"`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            let user = users[0];
            res.render("edit", { user });
        });
    } catch (err) {
        console.log(err);
        res.send("error in db");
    }
});

// update route

app.patch("/users/:id", (req, res) => {
    let { id } = req.params;
    let { password: formPass, username: newUsername } = req.body;
    let q = `Select * from user where id="${id}"`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            let user = users[0];
            if (formPass != user.password) {
                res.send("Wrong Password");
            } else {
                let q2 = `Update user SET username="${newUsername}" where id='${id}'`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    res.redirect("/users");
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.send("error in db");
    }
});

// delete Route

app.get("/users/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `Select * from user where id="${id}"`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            let user = users[0];
            res.render("delete", { user });
        });
    } catch (err) {
        console.log(err);
        res.send("error in db");
    }
});

app.delete("/users/:id", (req, res) => {
    let { id } = req.params;
    let { password: userPass, email: userEmail } = req.body;
    let q = `select * from user where id="${id}"`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];

            if (userPass != user.password || userEmail != user.email) {
                res.send("Email or Password is wrong!!");
            } else {
                let q2 = `delete from user where id="${id}" AND email="${userEmail}" AND password="${userPass}"`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    res.redirect("/users");
                });
            }
        });
    } catch (error) {
        console.log(err);
        res.send("error in db");
    }
});

app.listen(8080, () => {
    console.log("Server is listening on the port : 8080");
});
