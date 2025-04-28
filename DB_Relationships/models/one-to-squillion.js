// This code demonstrates how to create a one-to-squillion relationship in MongoDB

const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
    userName: String,
    email: String,
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addUser = async () => {
    const users = await User.insertMany([
        {
            userName: "Hardik",
            email: "hardik@gmail.com",
        },
        {
            userName: "Nikhil",
            email: "Nikhil@gmail.com",
        },
    ]);

    console.log("users", users);
};

// addUser();

const delUser = async () => {
    await User.deleteMany({});
};

// delUser();

const addPost = async () => {
    const posts = await Post.insertMany([
        {
            content: "This is my first post",
            likes: 100,
        },
        {
            content: "This is my second post",
            likes: 200,
        },
        {
            content: "This is my third post",
            likes: 300,
        },
        {
            content: "This is my fourth post",
            likes: 400,
        },
    ]);

    posts[0].user = await User.findOne({ userName: "Hardik" });
    posts[1].user = await User.findOne({ userName: "Nikhil" });
    posts[2].user = await User.findOne({ userName: "Hardik" });
    posts[3].user = await User.findOne({ userName: "Nikhil" });

    await posts[0].save();
    await posts[1].save();
    await posts[2].save();
    await posts[3].save();

    console.log("posts", posts);
};

addPost();

const delPost = async () => {
    await Post.deleteMany({});
};

// delPost();

const getPosts = async () => {
    const posts = await Post.find({}).populate("user", "userName");
    console.log("posts", posts);
};

// getPosts();
