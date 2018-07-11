let User = require('../repository/user');

module.exports = function DataServise () {
	let self = this;

	self.login = function(data, cbSuccess, cbError) {
		User.Schema.findOne({ username: data.username }, function(err, user) {
			if (err || !user) {
				cbError({ error: 'Authentication failed. Login or password wrong.' });
			} else {
				User.verifyPassword(data.pass, (err, success) => {
					if (err || !success) {
						cbError({ error: 'Authentication failed. Login or password wrong.' });
						return;
					}

					cbSuccess(user._id);
				}, user.password);
			}
		});
	}

	self.add = function(data, cbSuccess, cbError) {
		
		const new_user = new User.Schema({
			username: data.username,
			email: data.email,
			post: data.post,
			phone: data.phone,
			password: data.pass,
			fullname: data.fullname,
			rating: 0,
			regDate: data.regDate
		});

		new_user.save(function(err, user) {
			if (err) {
				let error = self.errorParse(err.message);
				cbError(error);
				return;
			}

			cbSuccess({ user: user });
		});
	}

	self.update = function(id, data, cbSuccess, cbError) {
		User.Schema.findOneAndUpdate({ _id: id }, {
			username: data.username,
			email: data.email,
			post: data.post,
			phone: data.phone,
			password: data.pass,
			fullname: data.fullname,
		},
		function(err, user) {
			if (err) {
				let error = self.errorParse(err.message);
				cbError(error);
				return;
			}
			data.id = id;
			delete data.pass;			
			cbSuccess({ user: data });
		});
	}

	self.delete = function(id, cbSuccess, cbError) {
		User.Schema.findOneAndRemove({ _id: id }, function(err, user) {
			if (err || !user) {
				cbError({ error: "Invalid id." });
				return;
			}
			cbSuccess({ success: true });
		});
	}

	self.findOne = function(id, cbSuccess, cbError) {
		User.Schema.findOne({ _id: id }, function(err, user) {
			if (err || !user) {
				cbError({ error: "Invalid id." });
				return;
			}
			cbSuccess(user);
		});
	}

	self.findAll = function(cbSuccess, cbError) {
		User.Schema.find({}, function(err, users) {
			if (err) {
				cbError({ error: err.message });
				return;
			}
			cbSuccess(users);
		});
	}

	self.errorParse = function(err) {
		let error = err.split(" ")[1];

		if (error === "duplicate") {
			error = self.checkEmptyFieldOrDublicate(err, "duplicate");
		} else if (error === "validation") {
			error = self.checkEmptyFieldOrDublicate(err, "validation");
		} else {
			error = self.checkEmptyFieldOrDublicate(err, "id");
		}
		return error;
	}
	self.checkEmptyFieldOrDublicate = function (err, validationOrDublicate) {
		let result = {},
			error;
			
		if (validationOrDublicate === "validation") {
			error = err.split("`")[1];

			if (error === "username") {
				result.error = {
					username: "empty"
				};
			} else if (error === "email") {
				result.error = {
					email: "empty"
				};
			} else if (error === "post") {
				result.error = {
					post: "empty"
				};
			} else if (error === "phone") {
				result.error = {
					phone: "empty"
				};
			} else if (error === "password") {
				result.error = {
					password: "empty"
				};
			} else if (error === "fullname") {
				result.error = {
					fullname: "empty"
				};
			}
		} else if (validationOrDublicate === "duplicate") {
			error = err.split("$")[1].split("_")[0];
			
			if (error === "username") {
				result.error = {
					username: "dublicate"
				};
			} else if (error === "email") {
				result.error = {
					email: "dublicate"
				};
			}
		} else {
			result.error = "Invalid id."
		}
		
		return result;
	}
}