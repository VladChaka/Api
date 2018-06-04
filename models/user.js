let mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    post: [{
        admonistrator: Boolean,
        frintenddeveloper: Boolean,
        backenddeveloper: Boolean,
        moderator: Boolean,
        redactor: Boolean,
        visitor: Boolean    
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
    regDate: {
        type: Date,
        required: true
    }
});

let User = mongoose.model("User", UserSchema);
module.exports = User;