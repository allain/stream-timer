var StreamTimer = require("../");
var interval = require("interval-stream");
var concat = require("array-concat-stream");
var streamArray = require("stream-array");
var stdout = require("stdout");

var data = ["foo", "bar", "fizz", "baz"];

var timer = new StreamTimer('example');

streamArray(data)
	.pipe(interval(1000))
	.pipe(timer.restart())
	.pipe(concat())
	.pipe(timer.tick('tick1'))
	.pipe(timer.tick('tick2'))
	.pipe(stdout());
