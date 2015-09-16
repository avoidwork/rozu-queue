const path = require("path");
const client = require(path.join(__dirname, "client.js"));
const handler = require(path.join(__dirname, "handler.js"));
const deferred = require("tiny-defer");
const retsu = require("retsu");

class Queue extends Array {
	constructor (...args) {
		super();
		this.config = {args};
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
			retsu.each(retsu.limit(this, 0, n), handler);
			retsu.remove(0, n);
			defer.resolve(true);
		};

		if (delay === 0) {
			process.nextTick(fn);
		} else {
			setTimeout(fn, delay);
		}

		return defer.promise;
	}
}

function queue () {
	return new Queue();
}

module.exports = queue;
