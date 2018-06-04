let mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    post: [{
        administrator: String,
        frintenddeveloper: String,
        backenddeveloper: String,
        moderator: String,
        redactor: String,
        visitor: String    
    }],
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
        type: Date,
        required: true
    }
});

let User = mongoose.model("User", UserSchema);

module.exports = User;