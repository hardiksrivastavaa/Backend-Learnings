
// This code demonstrates how to create a one-to-many [one-to-few] relationship in MongoDB 

const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
    userName: {
        type: String,
    },
    address: [
        {
            _id: false,
            location: String,
            city: String,
        },
    ],
});

const User = mongoose.model("User", userSchema);

const addUser = async () => {
    const user = new User({
        userName: "John Doe",
        address: [
            {
                location: "123 Main St",
                city: "New York",
            },
            {
                location: "456 Elm St",
                city: "Los Angeles",
            },
        ],
    });
    await user.save();
    console.log("User added:", user);
}

addUser();