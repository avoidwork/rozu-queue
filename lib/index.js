"use strict";

var path = require("path");
var client = require(path.join(__dirname, "client.js"));
var queue = require(path.join(__dirname, "queue.js"));

module.exports = { client: client, queue: queue };
