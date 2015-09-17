"use strict";

var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require("path");
var client = require(path.join(__dirname, "client.js"));
var deferred = require("tiny-defer");
var retsu = require("retsu");

var Queue = (function (_Array) {
	_inherits(Queue, _Array);

	function Queue() {
		_classCallCheck(this, Queue);

		_get(Object.getPrototypeOf(Queue.prototype), "constructor", this).call(this);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		this.config = [].concat(args);
		this.client = client.apply(undefined, args);
	}

	_createClass(Queue, [{
		key: "drain",
		value: function drain() {
			var fn = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

			if (fn) {
				retsu.iterate(this, fn);
			}

			this.length = 0;
		}
	}, {
		key: "process",
		value: (function (_process) {
			function process() {
				return _process.apply(this, arguments);
			}

			process.toString = function () {
				return _process.toString();
			};

			return process;
		})(function () {
			var _this = this;

			var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
			var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			var defer = deferred();
			var fn = function fn() {
				defer.resolve(_this.splice(0, n));
			};

			if (delay === 0) {
				process.nextTick(fn);
			} else {
				setTimeout(fn, delay);
			}

			return defer.promise;
		})
	}]);

	return Queue;
})(Array);

function queue() {
	for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		args[_key2] = arguments[_key2];
	}

	var obj = new (_bind.apply(Queue, [null].concat(args)))(),
	    id = obj.config[0];

	obj.client.on("message", function (channel, message) {
		obj.push({ channel: channel, message: JSON.parse(message) });
	});

	obj.client.subscribe(id);

	return obj;
}

module.exports = queue;
