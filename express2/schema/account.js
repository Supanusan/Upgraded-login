const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    "username": String,
    "password": String
})

const user = mongoose.model("userpassword", schema)


//Product Model...
const secschema = new mongoose.Schema({
    "image": String,
    "title": String,
    "productid": Number
})
const product = mongoose.model("product", secschema)

module.exports = { user, product };