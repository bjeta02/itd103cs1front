const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    position: String,
    username: String,
    email: String,
    salary: Number
})

const User = mongoose.model("User", UserSchema)

module.exports = User;