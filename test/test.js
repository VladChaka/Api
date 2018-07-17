let User = require("../repository/user"),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	server = require('../index'),
	mongoose = require("mongoose"),
	should = chai.should(),
	expect = chai.expect;

chai.use(chaiHttp);

// function test() {
// 	res.body.should.have.property("status");
// 	res.body.should.have.property("error");
// }

describe('Users', () => {
	let self = this;
	delete mongoose.connection.models['User'];
	User.apply(self);

    beforeEach(() => {
        self.Schema.remove({}, function (err) {
			if (err) throw new Error(err.message);
		});     
	});

	describe('/GET users', () => {
		it('it should GET all users', () => {
			chai.request(server)
				.get('/users')
				.end((err, res) => {
					if (err) throw new Error(err.message);
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
				});
		});

		it('it should GET user by the given id', () => {
			let user = new self.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			});

			user.save(function(err, user) {
				if (err) throw new Error(err.message);				
				chai.request(server)
					.get('/users/' + user.id)
					.end((err, res) => {
						if (err) throw new Error(err.message);
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property("username");
						res.body.should.have.property("email");
						res.body.should.have.property("post");
						res.body.should.have.property("phone");
						res.body.should.have.property("fullname");
					});
			});
		});

		it('it should not GET user by the given invalid id', () => {
			let user = new self.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			});

			user.save(function(err, user) {
				if (err) throw new Error(err.message);
				chai.request(server)
					.get('/users/4glglkj656344532dfasd')
					.end((err, res) => {
						if (err) throw new Error(err.message);
						res.should.have.status(400);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("error");
					});
			});
		});
	});

	describe('/POST users', () => {
		it('it should POST auth user', () => {
			let user = new self.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			});
			
			user.save(function(err, user) {
				if (err) throw new Error(err.message);
				chai.request(server)
					.post('/login')
					.send({
						username: "Vasya",
						password: "vlad12345"
					})
					.end((err, res) => {
						if (err) throw new Error(err.message);
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("id");
						res.body.should.have.property("token");
					});
			});
		});

		it('it should not POST auth user without password field', () => {
			let user = new self.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			});

			user.save(function(err, user) {
				if (err) throw new Error(err.message);
				chai.request(server)
					.post('/login')
					.send({
						username: "Vasya"
					})
					.end((err, res) => {
						if (err) throw new Error(err.message);
						res.should.have.status(400);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("error");
					});
			});
		});

		it('it should POST user', () => {
			let user = {
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				password: "vlad12345",
				phone: 4623452343,
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			};

			// expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			// expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			chai.request(server)
				.post('/users')
				.send(user)
				.end((err, res) => {
					if (err) throw new Error(err.message);
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.user.should.have.property("username");
					res.body.user.should.have.property("email");
					res.body.user.should.have.property("post");
					res.body.user.should.have.property("password");
					res.body.user.should.have.property("phone");
					res.body.user.should.have.property("fullname");
				});
		});

		it('it should not POST user without password field', () => {
			let user = {
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			};

			chai.request(server)
				.post('/users')
				.send(user)
				.end((err, res) => {
					if (err) throw new Error(err.message);
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('status');
					res.body.should.have.property('error');
				});
		});
	});

	describe('/PUT users', () => {
		it('it should PUT user by the given id', () => {
			let user = new self.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			});

			user.save(function(err, user) {
				if (err) throw new Error(err.message);
				chai.request(server)
					.put('/users/' + user.id)
					.send({
						username: "Fedya",
						email: "FedyaTop@mail.ru",
						post: "Odmen",
						phone: 4623452343,
						password: "Fedya12345",
						fullname: "Fedya Papkin"
					})
					.end((err, res) => {
						if (err) throw new Error(err.message);
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.user.should.have.property("username");
						res.body.user.should.have.property("email");
						res.body.user.should.have.property("post");
						res.body.user.should.have.property("phone");
						res.body.user.should.have.property("fullname");
					});
			});
		});

		it('it should not PUT user by the given invalid id', () => {
			let user = new self.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			});

			user.save(function(err, user) {
				if (err) throw new Error(err.message);
				chai.request(server)
					.put('/users/b3456jh3lj54g6345jl34')
					.send({
						username: "Fedya",
						email: "FedyaTop@mail.ru",
						post: "Odmen",
						phone: 4623452343,
						password: "Fedya12345",
						fullname: "Fedya Papkin"
					})
					.end((err, res) => {
						if (err) throw new Error(err.message);
						res.should.have.status(500);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("error");
					});
			});
		});
	});

	describe('/DELETE users', () => {
		it('it should DELETE user by the given id', () => {
			let user = new self.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			});

			user.save(function(err, user) {
				if (err) throw new Error(err.message);
				chai.request(server)
					.delete('/users/' + user.id)
					.end((err, res) => {
						if (err) throw new Error(err.message);
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("success");
					});
			});
		});

		it('it should not DELETE user by the given invalid id', () => {
			let user = new self.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin",
				rating: 0,
				regDate: "30.10.2018"
			});

			user.save(function(err, user) {
				if (err) throw new Error(err.message);
				chai.request(server)
					.delete('/users/4jglkj3454hg4hjgfhjg')
					.end((err, res) => {
						if (err) throw new Error(err.message);
						res.should.have.status(400);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("error");
					});
			});
		});
	});
});

