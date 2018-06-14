let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        post: {
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
        rating: {
            type: Number
        },
        regDate: {
            type: String
        }
	},
	// { collection: "users" }
	),
    User = mongoose.model("User", UserSchema);

module.exports = User;