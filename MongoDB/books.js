const mongoose = require("mongoose");

main()
    .then((res) => {
        console.log("connection succesful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazondb");
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        uppercase: true,
    },
    author: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxlength: 55,
    },
    price: {
        type: Number,
        min: [1, "Please Enter the value of price morethan 1"],
    },
    discount: {
        type: Number,
        default: 50,
    },
    genre: {
        type: String,
        enum: ["fiction", "nonfiction"],
    },
});

const Book = mongoose.model("Book", bookSchema);

let book1 = new Book({
    title: "MathemaTICcs I",
    author: "RD Sharmu",
    price: 10,
    genre: "fiction",
});

// book1
//     .save()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Book.findByIdAndUpdate("67fe0f2fba0f480c59fef7cd", { price: -500 }, {runValidators: true})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err.errors.price.properties.message);
//     });

Book.deleteMany({ price: { $gt: 0 } })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

