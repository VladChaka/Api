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


/*	
 *	
 *	My function
 *	
 */

function parsePath1(objectPath) {
    let path = [];

    if (typeof objectPath === 'string'){
        path = objectPath.split('.');
    } else {
        path = 'undefined';
    }
    return path;
}

function compileData1(object, template) {
    let result = {},
        dataArray = [];

    for (const key in template) {
        dataArray.push({
            key: key,
            template: template[key]
        });
    }

    for (let i = 0; i < dataArray.length; i++) {
        if (typeof dataArray[i]['template'] === 'object') {
            for (const key in dataArray[i]['template']) {
                result[dataArray[i]['key']] = compileData(object, dataArray[i]['template']);
            }
        } else {
            result[dataArray[i]['key']] = getData(object, dataArray[i]);
        }
    }

    return result;
}

function getData1(object, dataArray) {
    let result = {},
        path = parsePath(dataArray['template']);

    if (path.length > 1) {
        result = object;

        for (let i = 0; i < path.length; i++) {
            if (result[path[i]] === undefined) {
                result = 'undefined';
            } else {
                result = result[path[i]];
            }
        }
    } else {
        result = object[dataArray['template']];
    }

    return result;
}

/*	
 *	
 *	Not my function
 *	
 */

function parsePath(objectPath) {
    let path = [];

    if (typeof objectPath === 'string'){
        path = objectPath.split('.');
    } else {
        path = 'undefined';
    }
    return path;
}

function compileData(object, template) {
    let result = {},
        destination = result,
        dataArray = [],
        index = 0;

    for (const key in template) {
        dataArray.push({
            key: key,
            template: template[key],
            destination: destination
        });
    }

    for (let i = 0; i < dataArray.length - index; i++) {
        if (typeof dataArray[i]['template'] === 'object') {
            for (const key in dataArray[i]['template']) {
                dataArray.push({
                    key: key,
                    template: dataArray[i]['template'][key],
                    destination: destination
                });
                index++;
            }

            dataArray[i]['destination'] = {};
            for (let j = dataArray.length - index; j < dataArray.length; j++) {
                dataArray[i]['destination'][dataArray[j]['key']] = getData(object, dataArray[j]);
            }
        } else {
            dataArray[i]['destination'] = getData(object, dataArray[i]);
        }
        result[dataArray[i]['key']] = dataArray[i]['destination'];
    }
    return result;
}

function getData(object, arr) {
	let result = {},
        path = parsePath(arr['template']);

    if (path.length > 1) {
        result = object;
        for (let i = 0; i < path.length; i++) {
            if (result[path[i]] === undefined) {
                result = 'undefined';
            } else {
                result = result[path[i]];
            }
        }
    } else {
        result = object[arr['template']];
    }

    return result;
}

let object = {
        name: 'Maksim',
        age: 25,
        password: 123,
        phones: {
            mobile: '+375 321 7654321',
            fixed: '+375 123 1234567',
            test: {
            test1: "test2"
            }
        }
    },
    template = {
        asd: 123,
        name: 'name',
        age: 'age',
        mobilePhoneNumber: 'phones.mobile',
        mobile: {
            phoneFixed: 'phones.fixed',
            test: 'phones.test.test1'
        }
    },
    result = compileData(object, template),
    result1 = compileData1(object, template);

console.log(result);
console.log(result1);