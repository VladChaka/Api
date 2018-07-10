let User = require('../repository/user');

module.exports = function DataServise () {
	let self = this;

	self.login = function(data, cbSuccess, cbError) {
		User.Schema.findOne({ username: data.username }, function(err, user) {
			if (err) cbError({ error: err.message })
			if (!user) {
				cbError({ error: 'Authentication failed. Login or password wrong.' });
			} else if (user){
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
			
			cbSuccess({ success: user });
		});
	}

	self.update = function(id, data, cbSuccess, cbError) {
		User.Schema.findOneAndUpdate({ _id: id }, {
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
			cbSuccess({ success: user });
		});
	}

	self.delete = function(id, cbSuccess, cbError) {
		User.Schema.findOneAndRemove({ _id: id }, function(err, user) {
			if (err || !user) {
				cbError({ error: err.message });
				return;
			}
			cbSuccess({ success: true });
		});
	}

	self.findOne = function(id, cbSuccess, cbError) {
		User.Schema.findOne({ _id: id }, function(err, user) {
			if (err || !user) {
				cbError({ error: err.message });
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
			error = self.checkDublicat(err);
		} else {
			error = { error: err }
		}
		return error;
	}
	self.checkDublicat = function (err) {
		let emailOrUsername = err.split("$")[1].split("_")[0];

		if (emailOrUsername === "username") {
			emailOrUsername = { error: "This login duplicate" };
		} else if (emailOrUsername === "email") {
			emailOrUsername = { error: "This email duplicate" };
		}
		return emailOrUsername;
	}
}