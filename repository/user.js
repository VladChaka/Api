let mongoose = require("mongoose"),
	bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        post: {
            type: String
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String
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
	});

UserSchema.pre('save', function(callback) {
	const user = this;
	
	if (!user.isModified('password')) {
		callback();
		return;
	}
	bcrypt.genSalt(5, function(err, salt) {
		if (err) {
			callback(err);
			return;
		}
	
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				callback(err);
				return;
			}
			user.password = hash;
			callback();
		});
	});
});

UserSchema.methods.verifyPassword = function(password, cb, _thisPassword) {
	bcrypt.compare(password, this.password || _thisPassword, function(err, isMatch) {
		if (err) {
			cb(err);
			return;
		}
		cb(null, isMatch);
	});
};

module.exports = { Schema: mongoose.model("User", UserSchema), verifyPassword: UserSchema.methods.verifyPassword };