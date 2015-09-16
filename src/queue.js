const retsu = require("retsu");

class Queue extends Array {
	drain (iterate = false, fn) {
		if (iterate) {
			this.iterate(fn);
		}

		this.length = 0;
	}

	iterate (fn) {
		retsu.iterate(this, fn);
	}
}

function queue () {
	return new Queue();
}

module.exports = queue;
