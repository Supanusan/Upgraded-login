const { configDotenv } = require("dotenv");
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
const bcrypt = require('bcrypt');
const port = 5000;
const cors = require("cors");
const { product, user } = require("./schema/account");

app.use(cors());



configDotenv()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const connect = async () => {
    try {
        await mongoose.connect(process.env.MDB)
        console.log("MongoDB connected...")
    } catch (error) {
        console.log(error.message);

        process.exit(1)
    }
}

connect()


//TO create an Account
app.post("/create", async (req, res) => {

    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
        return res.status(400).json("username and password required")
    }
    const existing = await user.findOne({ username })
    if (existing) {
        return res.json("Already you have an account OR Already this name exists")
    }

    try {
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const Hpassword = hashedPassword

        const User = new user({ username, Hpassword })
        const saved = await User.save();
        if (saved) {
            res.status(201).json("Successfully Created...")
        }

    } catch (error) {
        return res.status(500).json(error.message)
    }

})

//To Login the account
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
        return res.status(400).json("username and password required")
    }
    try {
        const User = await user.findOne({ username })
        if (!User) {
            return res.status(404).json("User not found Create a account...!")
        }

        const isMatch = await bcrypt.compare(password, User.Hpassword)

        if (isMatch) {
            return res.status(200).json("Successfully login")
        } else {
            return res.status(401).json("password not correct")
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
})

var productid = 0;
//Add the product
app.post("/addproduct", async (req, res) => {
    try {
        const { image, title } = req.body
        if (!image || !title) {
            return res.status(401).json("Image and title required...")
        }
        const updproid = await product.countDocuments()
        productid = updproid + 1;
        const Product = new product({ image, title, productid })
        const addproduct = await Product.save();
        return res.status(200).json(`you products are added...your productid is ${productid}`)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

})


//Display all the products
app.get("/allproduct", async (req, res) => {
    try {
        const allproducts = await product.find()
        return res.json(allproducts)
    } catch (error) {
        res.json({ message: error.message })
    }

})

app.listen(port, () => { console.log(`http://localhost:${port}`) });