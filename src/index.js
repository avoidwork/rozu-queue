const path = require("path");
const client = require(path.join(__dirname, "client.js"));
const queue = require(path.join(__dirname, "queue.js"));

module.exports = {client: client, queue: queue};
