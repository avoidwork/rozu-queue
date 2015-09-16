"use strict";

var path = require("path");
var queue = require(path.join(__dirname, "queue.js"));

function factory() {
	return queue.apply(undefined, arguments);
}

module.exports = factory;
