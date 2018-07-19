/*	
 *	
 *	Currying
 *	
 */

// function print() {	
// 	let result = "";
// 	for (let i = 0; i < arguments.length; i++) {
// 		result += arguments[i] + " ";
// 	}
// 	return result;
// }

// function func(print) {
// 	let args = arguments, 
// 		massArgs = [];

// 	if (typeof print !== 'function') {
// 		return function () {
// 			console.log('The first arguments must be function!');
// 		} 
// 	}

// 	for (let i = 1; i < args.length; i++) {
// 		massArgs[i - 1] = args[i];
// 	}

// 	return function () {
// 	  	let argsArr = Array.prototype.slice.call(arguments, 0);
// 		massArgs = massArgs.concat(argsArr);
// 	  	return print.apply(this, massArgs);
// 	}
// } 

// let a = func(print, "Привет", "меня", "зовут", "Влад", "и", "мне", 21 + ".")();

/*	
 *	
 *	RegExp
 *	
 */

// let re = /(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/,
// 	re1 = /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{4,16}$/,
// 	email = "allankar2010@mail.ru",
// 	pass = "vlad12345";
	
// console.log(re.exec(email));
// console.log(re1.exec(pass));

 /*	
 *	
 *	Functional inheritance
 *	
 */
//  let Machine = function () {
// 	let self = this;
// 	self._enable = false;

// 	self.enable = function () {
// 		self._enable = true;
// 	}

// 	self.disable = function () {
// 		self._enable = false;
// 	}
//  }

//  let PC = function () {
// 	let self = this,
// 		timer;
// 	Machine.apply(self);

// 	function onReady () {
// 		console.log("Browser started!");
// 	}

// 	let enable = self.enable;
// 	self.enable = function () {
// 		enable();
// 		console.log("Computer enabled!");
// 	}

// 	let disable = self.disable;
// 	self.disable = function () {
// 		disable();
// 		clearTimeout(timer);
// 		console.log("Computer disabled!");
// 	}

// 	self.runBrowser = function () {
// 		if (!self._enable) {
// 			return console.log("Please start the computer");
// 		}
// 		timer = setTimeout(onReady, 1000);
// 	}
//  }

//  let computer = new PC();

//  computer.enable();
//  computer.runBrowser();
//  computer.disable();

 /*	
 *	
 *	Prototype inheritance
 *	
 */

// let Machine1 = function () {
// 	this._enable = false;
// }  
// Machine1.prototype.enable = function () {
// 	this._enable = true;
// }
// Machine1.prototype.disable = function () {
// 	this._enable = false;
// }

// let PC1 = function () {
// 	this.timer;
// 	Machine1.apply(this);
// }
// PC1.prototype = Object.create(Machine1.prototype);
// PC1.prototype.onReady = function () {
// 	console.log("Browser1 started!");
// }
// PC1.prototype.enable = function () {
// 	Machine1.prototype.enable.apply(this);

// 	if (this._enable) {
// 		console.log("Computer1 enabled!");
// 	}
// }
// PC1.prototype.disable = function () {
// 	Machine1.prototype.disable.apply(this);
// 	clearTimeout(this.timer);
// 	console.log("Computer1 disabled!");
// }
// PC1.prototype.runBrowser = function () {	
// 	if (!this._enable) {
// 		return console.log("Please start the computer1");
// 	}
// 	this.timer = setTimeout(PC1.prototype.onReady, 1000);
// }

// let computer1 = new PC1();

// computer1.enable();
// computer1.runBrowser();
// computer1.disable();


 /*	
 *	
 *	Some function
 *	
 */

// let user = {
// 	username: "Viktor",
// 	email: "Viktoria@mail.ru",
// 	post: "Odmennnnn",
// 	password: "vlad12345",
// 	phone: "4623452343",
// 	fullname: "Odmen Viktor",
// 	rating: 0,
// 	regDate: "30.10.2018"
// };

// let delField = [
// 	'password',
// 	'fullname',
// 	'rating'
// ];

// function rebuildUserData(userData, delField) {
// 	let user = {};
// 	for (const index in userData) {
// 		user[index]	= userData[index];
// 	}
		
// 	for (let i = 0; i < delField.length; i++) {
// 		delete user[delField[i]];
// 	}
// 	return user;
// }

// console.log(rebuildUserData(user, delField));


 /*	
 *	
 *	One more some function
 *	
 */

// function compileData(object, template, data, path, index) {
// 	index = index || 0;
// 	path = path || '';
// 	let result = data || {},
// 		arrTempKey = [],
// 		arrTempValue = [];

// 	for (const key in template) {
// 		arrTempKey.push(key);
// 		arrTempValue.push(template[key]);
// 	}
// 	if (path === '') {
// 		for (let i = 0; i < arrTempValue.length; i++) {
// 			path = arrTempValue[i].split('.');
// 			if (path[1] !== undefined) {
// 				result = compileData(object[path[0]], template, result, path, ++index);
// 			} else {
// 				result[arrTempKey[i]] = object[path[index]];
// 				delete template[arrTempKey[i]];
// 				delete template[arrTempValue[i]];
// 			}
// 		}
// 	} else {
// 		for (let i = 0; i < arrTempValue.length; i++) {
// 			if (object[path[index]] === undefined) {
// 				path = arrTempValue[i].split('.');
// 				result = compileData(object[path[index]], template, result, path, ++index);
// 			} else {
// 				result[arrTempKey[i]] = object[path[index]];
// 				path.splice(1,1);
// 				delete template[arrTempKey[i]];
// 				delete template[arrTempValue[i]];
// 			}
// 		}
// 	}
// 	return result;
// }

function parsePath(objectPath) {
	let path = [];
	for (const key in objectPath) {
		path.push(objectPath[key]);
	}
	console.log(path);
	
	let splitPath = [];
	for (let i = 0; i < path.length; i++) {
		splitPath.push(path[i].split("."));
	}
	let result = [];
	for (let i = 0; i < splitPath.length; i++) {
		if (splitPath[i].length === 1) {
			result[i] = splitPath[i][0];
		} else {
			for (let j = 0; j < splitPath[i].length; j++) {
				console.log(splitPath[i][j]);
				
				result[i] = splitPath[i][j];
			}
		}
	}
	console.log(result);
	
	return splitPath;
}

function getData(object, template, path, index) {
	index = index || 0;
	path = parsePath(template);
	let result = {};
	

	// if (object[template[key]] === undefined) {
	// 	getData()
	// } else {
	// 	result[template[key]] = object[template[key]];
	// }

	
	// if (typeof result === "object") {
	// 	result = getHandler(result, pathNodes, ++index);
	// }

    return result;
}

// function getData(object, template, result, path, index) {
// 	index = index || 0;
// 	path = path || [];
// 	result = result || {};
	
// 	console.log('object',object);
// 	console.log('path',path);
	
	
// 	for (const key in template) {
// 		console.log(template[key]);
		
// 		if (object[template[key]] === undefined) {
// 			path = template[key].split('.');
			
// 			getData(object[path[0]], template, result, path);
// 		} else {
// 			result[template[key]] = object[template[key]];
// 		}
// 	}

//     return result;
// }

let object = {
        name: 'Maksim',
        age: 25,
        password: 123,
        phones: {
            mobile: '+375 321 7654321',
			fixed: '+375 123 1234567',
			test: {
				test3: 'asd',
				test1: {
					test2: "success",
					test4: {
						test5: "yes"
					}
				}
			}
        }
    },
    template = {
        name: 'name',
        age: 'age',
		mobilePhoneNumber: 'phones.mobile'//,
		// test: 'phones.test.test3',
		// test1: 'phones.test.test1.test2',
		// test2: 'phones.test.test1.test4.test5'
    },
    result;

// result = compileData(object, template);
result = getData(object, template);
console.log(result);