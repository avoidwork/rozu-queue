const path = require("path");
const client = require(path.join(__dirname, "client.js"));
const deferred = require("tiny-defer");
const retsu = require("retsu");

class Queue extends Array {
	constructor (...args) {
		super();
		this.config = [...args];
		this.client = client(...args);
	}

	drain (fn = undefined) {
		if (fn) {
			retsu.iterate(this, fn);
		}

		this.length = 0;
	}

	process (n, delay = 0) {
		let defer = deferred();
		let fn = () => {
			let data = retsu.limit(this, 0, n);

			retsu.remove(0, n);
			defer.resolve(data);
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
	let obj = new Queue(...args);

	obj.client.on("message", function (channel, message) {
		obj.push({channel: channel, message: JSON.parse(message)});
	});

	return obj;
}

module.exports = queue;
