var StreamTimer = require("../");
var interval = require("interval-stream");
var concat = require("array-concat-stream");
var streamArray = require("stream-array");

var data = ["foo", "bar", "fizz", "baz"];

var timer = StreamTimer('example');

streamArray(data)
	.pipe(interval(1000))
	.pipe(timer.restart)
	.pipe(concat())
	.pipe(timer);
