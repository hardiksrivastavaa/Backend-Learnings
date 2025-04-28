// This code demonstrates how to create a one-to-many relationship in MongoDB

const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});


const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});

// Middleware to delete orders when a customer is deleted
customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer.orders.length) {
        let res = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log("Orders deleted:", res);
    }
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addOrder = async () => {
    const order = await Order.insertMany([
        {
            item: "Laptop",
            price: 1000,
        },
        {
            item: "Phone",
            price: 500,
        },
    ]);

    console.log("Order added:", order);
};

// addOrder();

const addCustomer = async () => {
    const customer = new Customer({
        name: "John Doe",
    });

    let order1 = await Order.findOne({ item: "Laptop" });
    let order2 = await Order.findOne({ item: "Phone" });

    customer.orders.push(order1);
    customer.orders.push(order2);

    let result = await customer.save();
}

// addCustomer();


const findCustomer = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log("Customer added:", result[0]);
};

// findCustomer();

const addCust = async () => {

    let newCust = new Customer({
        name: "Anshu",
    });

    let newOrder = new Order({
        item: "Papita",
        price: 300,
    });

    newCust.orders.push(newOrder);
    await newCust.save();
    await newOrder.save();
    console.log("New Customer added:", newCust);
}

// addCust();

const delCust = async () => {
    let result = await Customer.findByIdAndDelete("680f5681eb10344dd3aff742");
    console.log("Customer deleted:", result);
}

// delCust();



