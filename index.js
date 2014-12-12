var through2 = require("through2");

module.exports = StreamTimer;

function StreamTimer(name, logger) {
	name = name || 'timer';
	logger = logger || function(msg) { console.log(msg); };

	var startTime = Date.now();

	var stream = through2({decodeStrings: false}, function(chunk, encoding, cb) {
		var ellapsed = Date.now() - startTime;

		logger(name + ": +" + ellapsed + "ms");

		this.push(chunk);
		cb();
	});

	stream.restart = through2({decodeStrings: false}, function(chunk, encoding, cb) {
		startTime = Date.now();
		logger(name + ": started at " + startTime);

		this.push(chunk);
		cb();
	});

	return stream;
}
