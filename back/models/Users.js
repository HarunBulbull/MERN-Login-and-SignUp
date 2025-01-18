const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    userName: { type: String, required: true, unique: true},
    userMail: { type: String, required: true, unique: true},
    userPassword: { type: String, required: true },
}, { timestamps: true })


const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;