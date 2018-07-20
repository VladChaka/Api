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

// function parsePath(objectPath) {
// 	return objectPath.split('.');
// }

// function compileData(object, template, data) {
// 	let result = data || {},
// 		path;

// 	for (const key in template) {
// 		path = parsePath(template[key]);
// 		result = getData(object, result, path , 0, key);
// 	}

//     return result;
// }

// function getData(object, data, path, index, key) {
// 	index = index || 0;
	
// 	data[key] = object[path[index]];
	
// 	if (typeof data[key] === 'object') {		
// 		data = getData(data[key], data, path, ++index, key);
// 	}
		
// 	return data;
// }


// function parsePath(objectPath) {
//     return objectPath.split('.');
// }

// function compileData(object, template, data) {
//     let result = data || {},
//         path;

//     for (const key in template) {
//         path = parsePath(template[key]);
//         result[key] = getData(object, result, path , 0);
//     }

//     return result;
// }

// function getData(object, data, path, index) {
//     index = index || 0;
//     let result = object[path[index]];

//     if (typeof result === 'object') {
//         result = getData(data, result, path, ++index);
//     }

//     return result;
// }

function parsePath(objectPath) {
	let path;
	if (typeof objectPath === object) {
		path
	} else {
		path = objectPath.split('.');
	}
    return path;
}

function compileData(object, template) {
	let result = {},
		dataArray = [],
		tipoResult = result;

    for (const key in template) {
		dataArray.push({
			object: object,
			key: key,
			template: template[key],
			tipoResult: tipoResult
		})
	}

	for (let i = 0; i < dataArray.length; i++) {
		result[dataArray[key]] = getData(dataArray[i]);
	}

    return dataArray;
}

function getData(arr) {
    index = index || 0;
	let result = arr[object[arr[template]]],
		path = arr[template];

	if (path.length > 1) {
		
	} else {
		if (typeof result === 'object') {
			result = getData(data, result, path, ++index);
		}
	}

    return result;
}

let object = {
        name: 'Maksim',
        age: 25,
        password: 123,
        phones: {
            mobile: '+375 321 7654321',
            fixed: '+375 123 1234567'
        }
    },
    template = {
        name: 'name',
        age: 'age',
        mobilePhoneNumber: 'phones.mobile'
    },
    result = compileData(object, template);
	
console.log(result);