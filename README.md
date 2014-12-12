# stream-timer

DO NOT USE YET. It's a work in progress

A naive tool for easily timing stream operations.

## Installing

``` bash
npm install --save stream-timer
```

## API

### `new StreamTimer([name], [logger])`

#### parameters

* `[name]`    (String): name of the timer to display in the logs, if blank, uses "timer"
* `[logger]`  (Function): function which accepts a message to log, if not given, defaults to console.log


### `StreamTimer.prototype.tick()`

#### returns

*  (Transform) that prints the time elapsed since the timer was started.

### `StreamTimer.prototype.restart()`

#### returns

*  (Transform) that restarts the timer and prints the current time

## Example

```javascript
var StreamTimer = require("stream-timer");
var interval = require("interval-stream");
var concat = require("array-concat-stream");
var stdout = require("stdout");
var streamArray = require("stream-array");

var data = ["foo", "bar", "fizz", "baz"];

var timer = new StreamTimer('example');

streamArray(data)
  .pipe(interval(1000))
  .pipe(timer.restart())
  .pipe(concat())
  .pipe(timer.tick('step 1'))
  .pipe(timer.tick('step 2'))
  .pipe(stdout());

```
