// let server = require("../index"),
// 	mongoose = require("mongoose"),
// 	User = require("../repository/user"),
// 	chai = require("chai"),
// 	chaiHttp = require("chai-http"),
// 	should = chai.should();	

// chai.use(chaiHttp);

// describe("User", function () {
// 	beforeEach((done) => { //Перед каждым тестом чистим базу
//         User.Schema.remove({}, (err) => { 
// 			setTimeout(done, 10000);  
//         });     
//     });
	
// 	describe("GET users", function () {
// 		it("it should get all users", () => {
// 			chai.request(server)
// 				.get("/users")
// 				.end((err, res) => {
// 					res.should.have.status(500);
// 					res.body.should.be.a("array");
// 					res.body.length.should.be.eql(0);
// 				});
// 		});
// 	});

// 	// describe("POST user add", () => {
// 	// 	it("it should add user", () => {
// 	// 		let user = {
// 	// 			username: "Vasya",
// 	// 			email: "allankar2010@mail.ru",
// 	// 			post: "Admin",
// 	// 			phone: 4623452343,
// 	// 			password: "vlad12345",
// 	// 			fullname: "Vasya Pupkin"
// 	// 		};
// 	// 		chai.request(server)
// 	// 			.post("/users")
// 	// 			.send(user)
// 	// 			.end((err, res) => {
// 	// 				res.should.have.status(200);
// 	// 				res.body.should.be.a("array");
// 	// 			});
// 	// 	});
// 	// });

// 	describe('/DELETE/:id user', () => {
// 		it('it should DELETE a user given the id', (done) => {
// 			let user = new User.Schema({
// 				username: "Vasya",
// 				email: "allankar2010@mail.ru",
// 				post: "Admin",
// 				phone: 4623452343,
// 				password: "vlad12345",
// 				fullname: "Vasya Pupkin"
// 			});
// 		  	User.Schema.save((err, user) => {
// 				  chai.request(server)
// 				  .delete('/book/' + book.id)
// 				  .end((err, res) => {
// 					  res.should.have.status(200);
// 					  res.body.should.be.a('object');
// 					  res.body.should.have.property('message').eql('Book successfully deleted!');
// 					  res.body.result.should.have.property('ok').eql(1);
// 					  res.body.result.should.have.property('n').eql(1);
// 					done();
// 				  });
// 			});
// 		});
// 	});

// 	// describe("DELETE user delete", function () {
// 	// 	it("it should add delete", function (done) {
// 			// let user = new User.Schema({
// 			// 	username: "Vasya",
// 			// 	email: "allankar2010@mail.ru",
// 			// 	post: "Admin",
// 			// 	phone: 4623452343,
// 			// 	password: "vlad12345",
// 			// 	fullname: "Vasya Pupkin"
// 			// });
// 	// 		chai.request(server)
// 	// 			.delete("/users/" + user.id)
// 	// 			.end((err, res) => {
// 	// 				res.should.have.status(200);
// 	// 				res.body.should.be.a("array");
// 	// 				done();
// 	// 			});
// 	// 	});
// 	// });
// });




let mongoose = require("mongoose");
let User = require("../repository/user");

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('Users', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        User.Schema.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Тест для /GET 
  */
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});

