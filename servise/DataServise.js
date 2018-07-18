let User = require('../repository/user'),
	bcrypt = require('bcrypt-nodejs');

module.exports = function DataServise () {
	let self = this;
	User.apply(self);

	self.login = function(data, cbSuccess, cbError) {			
		self.Schema.findOne({ username: data.username }, function(err, user) {
			if (err || !user) {
				cbError({ error: 'Authentication failed. Login or password wrong.' });
			} else {
				self.UserSchema.methods.verifyPassword(data.password, (err, success) => {
					if (err || !success) {
						cbError({ error: 'Authentication failed. Login or password wrong.' });
						return;
					}
					cbSuccess(user._id);
				}, user.password);
			}
		});
	}

	self.findAll = function(cbSuccess, cbError) {
		self.Schema.find({}, function(err, users) {
			if (err) {
				cbError({ error: err.message });
				return;
			}
			let data = rebuildUserData(users, false);
			cbSuccess(data);
		});
	}

	self.findOne = function(id, cbSuccess, cbError) {
		self.Schema.findOne({ _id: id }, function(err, user) {
			if (err || !user) {
				cbError({ error: "Invalid id." }, 400);
				return;
			}
			data = rebuildUserData(user, true);
			cbSuccess(data);
		});
	}

	self.add = function(data, cbSuccess, cbError) {
		let emptyField = checkEmptyField(data);	

		if (emptyField.length !== 0) {
			let error = { error: "Fields empty."};
			cbError(error, 400);
		} else {
			if (!checkRegExEmail(data.email)) return cbError({ error: "Incorrect email" }, 400);
			if (!checkRegExLogin(data.username)) return cbError({ error: "Incorrect login" }, 400);
			if (!checkRegExPassword(data.password)) return cbError({ error: "Incorrect password" }, 400);
			const new_user = new self.Schema({
				username: data.username,
				email: data.email,
				post: data.post,
				phone: data.phone,
				password: data.password,
				fullname: data.fullname,
				rating: 0,
				regDate: data.regDate
			});
			hashPassword(new_user, function (new_user) {
				new_user.save(function(err, user) {
					if (err) {
						cbError({ error: err.message }, 500);
						return;
					}
					data = rebuildUserData(user, true);					
					cbSuccess(data);
				});
			}, function (err) {
				cbError({ error: err.message }, 500);
			});
		}
	}

	self.update = function(id, data, cbSuccess, cbError) {
		let emptyField = checkEmptyField(data);	

		if (emptyField.length !== 0) {
			let error = { error: "Fields empty."};
			cbError(error, 400);
		} else {
			if (!checkRegExEmail(data.email)) return cbError({ error: "Incorrect email" }, 400);
			if (!checkRegExLogin(data.username)) return cbError({ error: "Incorrect login" }, 400);
			
			hashPassword(data, function (data) {
				let dataJson = {
					email: data.email,
					post: data.post,
					phone: data.phone,
					fullname: data.fullname,
				};
				self.Schema.findOneAndUpdate({ _id: id }, dataJson,
				function(err, user) {
					if (err) {
						let error = { error: err.message};
						cbError(error, 500);
						return;
					}
					data = rebuildUserData(user, true);			
					cbSuccess(data);
				});
			}, function (err) {
				cbError({ error: err.message }, 500);
			});
		}
	}

	self.delete = function(id, cbSuccess, cbError) {
		self.Schema.findOneAndRemove({ _id: id }, function(err, user) {
			if (err || !user) {
				cbError({ error: "Invalid id." }, 400);
				return;
			}
			cbSuccess({ success: true });
		});
	}

	self.UserSchema.methods.verifyPassword = function(password, cb, _thisPassword) {
		bcrypt.compare(password, _thisPassword, function(err, isMatch) {			
			if (err) {
				cb(err);
				return;
			}
			cb(null, isMatch);
		});
	};

	function find(arr, value) {
		let result = -1;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === value) {
				result = 1;
				break;
			}
		}
		return result;
	}
	
	function rebuildUserData(userData, delField, oneUser) {
		let user;
		if (oneUser === true) {
			let standartUserFields = [
				'id',
				'username',
				'email',
				'phone',
				'fullname',
				'post'
			];
			user = {};
			for (const index in userData) {
				for (let i = 0; i < standartUserFields.length; i++) {
					if (index !== standartUserFields[i]) {
						user[index]	= userData[index];
					}
				}
			}

			for (let i = 0; i < delField.length; i++) {
				delete user[delField[i]];
			}
		} else {
			user = [];
			for (let i = 0; i < userData.length; i++) {
				user.push({
					_id: userData[i]._id,
					username: userData[i].username,
					fullname: userData[i].fullname,
					post: userData[i].post,
					regDate: userData[i].regDate,
					rating: userData[i].rating
				});				
			}
		}		
		return user;
	}

	function checkEmptyField(userData) {
		let result = [];
		for (let index in userData) {
			let field = userData[index];			
			field = field.replace(/\s*/g, '');
			if (field === "") {
				result.push(index);
			}
		}
		return result;
	}

	function hashPassword(data, cbSuccess) {
		const user = data;
		if (data.password !== undefined && data.password.length !== 0) {
			if (!checkRegExPassword(data.password)) return cbError({ error: "Incorrect password" }, 400);
			bcrypt.genSalt(5, function(err, salt) {
				if (err) {
					return;
				}
			
				bcrypt.hash(user.password, salt, null, function(err, hash) {
					if (err) {
						return;
					}
					user.password = hash;
					cbSuccess(user);
				});
			});
		} else {
			cbSuccess(user);
		}
	};

	function checkRegExLogin(login) {
		return /^[a-zA-Z1-9].{4,16}$/.test(login);
	}
	function checkRegExPassword(pass) {
		return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7;
	}
	function checkRegExEmail(email) {
		return /(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/.test(email);
	}	
}