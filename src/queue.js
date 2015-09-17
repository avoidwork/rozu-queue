const path = require("path");
const client = require(path.join(__dirname, "client.js"));
const deferred = require("tiny-defer");

class Queue extends Array {
	constructor (...args) {
		super();
		this.config = [...args];
		this.client = client(...args);
	}

	drain (fn = undefined) {
		if (fn) {
			this.forEach(fn);
		}

		this.length = 0;
	}

	process (n = 1, delay = 0) {
		let defer = deferred();
		let fn = () => {
			defer.resolve(this.splice(0, n));
		};

		if (delay === 0) {
			process.nextTick(fn);
		} else {
			setTimeout(fn, delay);
		}

		return defer.promise;
	}
}

function queue (...args) {
	let obj = new Queue(...args),
		id = obj.config[0];

	obj.client.on("message", function (channel, message) {
		obj.push({channel: channel, message: JSON.parse(message)});
	});

	obj.client.subscribe(id);

	return obj;
}

module.exports = queue;
