var through2 = require("through2");

module.exports = StreamTimer;

function StreamTimer(timerName, logger) {
	timerName = timerName || 'timer';
	logger = logger || function(msg) { console.log(msg); };

	this.tick = function(tickName) {
		var tickSuffix = tickName ? " at " + tickName : "";

		return through2.obj(function(chunk, encoding, cb) {
			var ellapsed = Date.now() - startTime;

			logger(timerName + ": +" + ellapsed + "ms" + tickSuffix);

			this.push(chunk);

			cb();
		});
	};

	this.restart = function() {
		return through2.obj(function(chunk, encoding, cb) {
			startTime = Date.now();

			logger(timerName + ": started at " + startTime);

			this.push(chunk);

			cb();
		});
	};
}
