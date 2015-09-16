const path = require("path");
const queue = require(path.join(__dirname, "queue.js"));


function factory (...args) {
	return queue(...args);
}

module.exports = factory;
