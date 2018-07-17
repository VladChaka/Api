// let mongoose = require("mongoose"),
//     Schema = mongoose.Schema,
//     UserSchema = new Schema({
//         username: {
//             type: String,
//             unique: true,
//             required: true
//         },
//         email: {
//             type: String,
//             unique: true,
//             required: true
//         },
//         post: {
//             type: String,
//             required: true
//         },
//         phone: {
//             type: String,
//             required: true
//         },
//         password: {
//             type: String,
//             required: true
//         },
//         fullname: {
//             type: String,
//             required: true
//         },
//         rating: {
//             type: Number
//         },
//         regDate: {
//             type: String
//         }
// 	});	

// module.exports = { SchemaModel: mongoose.model("User", UserSchema), Schema: UserSchema };



let mongoose = require("mongoose"),
	Schema = mongoose.Schema;
	
module.exports = function (){
	let self = this;
	self.UserSchema = new Schema({
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
				type: String,
				required: true
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
				type: Number,
				required: true
			},
			regDate: {
				type: String,
				required: true
			}
		});
}