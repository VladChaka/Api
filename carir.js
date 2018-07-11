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

let re = /(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/,
	// re1 = /^(?=.*[\d])(?=.*[a-z]).{4,16}$/,
	re2 = /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{4,16}$/,
	email = "allankar2010@mail.ru",
	pass = "vlad12345";
	
// console.log(re.exec(email));
console.log(re2.exec(pass));
