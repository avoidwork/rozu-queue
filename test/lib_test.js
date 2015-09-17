var rozo_queue = require("../lib/index"),
	array = require("retsu"),
	assert = require("assert"),
	redis = require("redis"),
	client = redis.createClient(6379, "localhost");

describe("Queue behavior", function () {
	var queue = rozo_queue("rozu", 6379, "localhost");

	describe("First into the queue", function () {
		it("Adds items to the queue", function (done) {
			assert.equal(0, queue.length);
			queue.push({channel:queue.config[0], message: {abc:true}});
			client.publish(queue.config[0], JSON.stringify({abc:false}));
			queue.client.on("message", function () {
				assert.equal(2, queue.length);
				done();
			});
		});
	});

	describe("First out of the queue", function () {
		it("Processes items from the queue", function (done) {
			assert.equal(2, queue.length);
			queue.process(1).then(function (args) {
				assert.equal(1, queue.length);
				assert.equal(1, args.length);
				assert.equal(true, args[0].message.abc);
				done();
			});
		});
	});

	describe("Last out of the queue", function () {
		it("Processes items from the queue", function (done) {
			assert.equal(1, queue.length);
			queue.drain(function (i) {
				assert.equal(false, i.message.abc);
			});
			assert.equal(0, queue.length);
			done();
		});
	});
});