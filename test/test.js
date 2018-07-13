
let User = require("../repository/user"),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	server = require('../index'),
	should = chai.should(),
	expect = chai.expect;

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach(() => {
        User.Schema.remove({}, function (err) {
			if (err) console.log(err.message);
		});     
	});

	describe('/GET users', () => {
		it('it should GET all users', () => {
			chai.request(server)
				.get('/users')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
				});
		});

		it('it should GET user by the given id', () => {
			let user = new User.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin"
			});

			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			user.save(function(err, user) {
				chai.request(server)
					.get('/users/' + user.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property("username");
						res.body.should.have.property("email");
						res.body.should.have.property("post");
						res.body.should.have.property("password");
						res.body.should.have.property("phone");
						res.body.should.have.property("fullname");
					});
			});
		});

		it('it should not GET user by the given invalid id', () => {
			let user = new User.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin"
			});

			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			user.save(function(err, user) {
				chai.request(server)
					.get('/users/4glglkj656344532dfasd')
					.end((err, res) => {
						res.should.have.status(500);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("error");
						res.body.status.should.have.eql(500);
						res.body.error.should.have.eql("Invalid id.");
					});
			});
		});
	});

	describe('/POST users', () => {
		it('it should POST auth user', () => {
			let user = new User.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin"
			});
			
			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			user.save(function(err, user) {
				chai.request(server)
					.post('/login')
					.send({
						username: "Vasya",
						password: "vlad12345"
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("id");
						res.body.should.have.property("token");
						res.body.status.should.have.eql(200);
					});
			});
		});

		it('it should not POST auth user without password field', () => {
			let user = new User.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin"
			});

			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			user.save(function(err, user) {
				chai.request(server)
					.post('/login')
					.send({
						username: "Vasya"
					})
					.end((err, res) => {
						res.should.have.status(400);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("error");
						res.body.status.should.have.eql(400);
						res.body.error.should.have.eql("Authentication failed. Login or password wrong.");
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
				fullname: "Vasya Pupkin"
			};

			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			chai.request(server)
				.post('/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property("status");
					res.body.should.have.property("user");
					res.body.should.have.property("message");
					res.body.status.should.have.eql(200);
					res.body.user.should.have.property("username");
					res.body.user.should.have.property("email");
					res.body.user.should.have.property("post");
					res.body.user.should.have.property("password");
					res.body.user.should.have.property("phone");
					res.body.user.should.have.property("fullname");
					res.body.message.should.have.eql("User successfully added!");
				});
		});

		it('it should not POST user without password field', () => {
			let user = {
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				fullname: "Vasya Pupkin"
			};

			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);

			chai.request(server)
				.post('/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(500);
					res.body.should.be.a('object');
					res.body.should.have.property('status');
					res.body.should.have.property('error');
					res.body.error.should.have.property('password');
					res.body.status.should.have.eql(500);
					res.body.error.password.should.have.eql('empty');
				});
		});
	});

	describe('/PUT users', () => {
		it('it should PUT user by the given id', () => {
			let user = new User.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin"
			});

			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			user.save(function(err, user) {
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
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("user");
						res.body.should.have.property("message");
						res.body.status.should.have.eql(200);
						res.body.user.should.have.property("username");
						res.body.user.should.have.property("email");
						res.body.user.should.have.property("post");
						res.body.user.should.have.property("phone");
						res.body.user.should.have.property("fullname");
						res.body.message.should.have.eql("User successfully updated!");
					});
			});
		});

		it('it should not PUT user by the given invalid id', () => {
			let user = new User.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin"
			});

			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			user.save(function(err, user) {
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
						res.should.have.status(500);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("error");
						res.body.status.should.have.eql(500);
						res.body.error.should.have.eql("Invalid id.");
					});
			});
		});
	});

	describe('/DELETE users', () => {
		it('it should DELETE user by the given id', () => {
			let user = new User.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin"
			});

			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			user.save(function(err, user) {
				chai.request(server)
					.delete('/users/' + user.id)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("success");						
						res.body.should.have.property("message");
						res.body.status.should.have.eql(200);
						res.body.success.should.have.eql(true);
						res.body.message.should.have.eql("User successfully deleted!");
					});
			});
		});

		it('it should not DELETE user by the given invalid id', () => {
			let user = new User.Schema({
				username: "Vasya",
				email: "allankar2010@mail.ru",
				post: "Admin",
				phone: 4623452343,
				password: "vlad12345",
				fullname: "Vasya Pupkin"
			});

			expect(user.email).to.match(/(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/);
			expect(user.password).to.match(/^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/);

			user.save(function(err, user) {
				chai.request(server)
					.delete('/users/4jglkj3454hg4hjgfhjg')
					.end((err, res) => {
						res.should.have.status(500);
						res.body.should.be.a('object');
						res.body.should.have.property("status");
						res.body.should.have.property("error");
						res.body.status.should.have.eql(500);
						res.body.error.should.have.eql("Invalid id.");
					});
			});
		});
	});
});

