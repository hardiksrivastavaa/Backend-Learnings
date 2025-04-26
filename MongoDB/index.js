const mongoose = require("mongoose");

main()
    .then((res) => {
        console.log("connection succesful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/deltadb");

}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);

// const user2 = new User({
//     name: "Hardik Srivastava",
//     email: "hardikfgp@gmail.com",
//     age: 18,
// });

// user2.save()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

// User.insertMany([
//     { name: "hadik", email: "hardik@gmail.com", age: 18 },
//     { name: "pardik", email: "pardik@gmail.com", age: 28 },
//     { name: "jardik", email: "jardik@gmail.com", age: 38 },
//     { name: "sardik", email: "sardik@gmail.com", age: 48 },
// ]).then((res) => console.log(res));

// User.findById("67efd7cefb2da3c69e12f923").then((res) => console.log(res));

// User.updateOne({ name: "hadik" }, { age: 20 })
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

// User.updateMany({ age: { $gt: 20 } }, { age: 70 })
// .then((res) => console.log(res))
// .catch((err) => console.log(err));

// User.findOneAndUpdate({age : 70}, {age : 80}, {new : true})
// .then((res) => console.log(res))
// .catch((err) => console.log(err));

// User.deleteMany({ age: { $gt: 50 } })
// .then((res) => console.log(res))
// .catch((err) => console.log(err));

// User.deleteOne({ age: 20 })
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

// User.findOneAndDelete({ age: 38 })
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

User.findByIdAndDelete("67efdef0654b045800c9265e")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));