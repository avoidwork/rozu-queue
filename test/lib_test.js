var rozo_queue = require("../lib/index"),
	array = require("retsu"),
	assert = require("assert");

describe("Queue behavior", function () {
	var queue = rozo_queue('rozu_test', 6379, "localhost");

	describe("First into the queue", function () {
		it("Adds items to the queue", function (done) {
			assert.equal(0, queue.length);
			queue.push({channel:'rozu_test', message: {abc:true}});
			queue.push({channel:'rozu_test', message: {abc:false}});
			assert.equal(2, queue.length);
			done();
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
});