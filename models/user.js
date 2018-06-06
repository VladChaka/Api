let mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    counter: {
        type: Number
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    administrator: {
        type: String
    },
    frintenddeveloper: {
        type: String
    },
    backenddeveloper: {
        type: String
    },
    moderator: {
        type: String
    },
    redactor: {
        type: String
    },
    visitor: {
        type: String
    },   
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    rating: Number,
    regDate: {
        type: String
    }
},
{collection:"users"});

module.exports = mongoose.model("User", UserSchema);