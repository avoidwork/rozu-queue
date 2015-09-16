const Map = require("es6-map");
const redis = require("redis");
let registry = new Map();

function client (id, port, host, options) {
	if (!registry.has(id)) {
		registry.set(id, redis.createClient(port, host, options));
	}

	return registry.get(id);
}

module.exports = client;
