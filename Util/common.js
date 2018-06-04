function getParam(key, value) {
	let result = value;

    for (let index in process.argv) {
        let keyValue = process.argv[index].split("=", 2);
        pref = keyValue[0].toLowerCase();

        if (pref === key) {
            result = keyValue[1];
            break;
        }
    }
	return result;
}

module.exports = getParam;