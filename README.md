# stream-timer

A naive tool for easily timing stream operations.

## Installing

``` bash
npm install --save stream-timer
```

Use [browserify](http://browserify.org/) to make a bundle that uses this module.

## API

### `StreamTimer([name], [logger])`

#### parameters

* `[name]`    (String): name of the timer to display in the logs, if blank, uses "timer"
* `[logger]`  (Function): function which accepts a message to log, if not given, defaults to console.log

#### returns

* (Transform): Pipe elements into it and it will pass them through, reporting how much
    time has ellapsed since the timer was last started


## Example

```javascript
var StreamTimer = require("stream-timer");
var interval = require("interval-stream");
var concat = require("array-concat-stream");
var stdout = require("stdout");
var streamArray = require("stream-array");

var data = ["foo", "bar", "fizz", "baz"];

var timer = StreamTimer('example');

streamArray(data)
.pipe(interval(1000))
.pipe(timer.restart)
.pipe(concat())
.pipe(timer)
.pipe(stdout);
