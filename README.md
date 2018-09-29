# Terminal Game IO

[![npm version](https://badge.fury.io/js/terminal-game-io.svg)](https://badge.fury.io/js/terminal-game-io)
[![Build Status](https://travis-ci.org/robertrypula/terminal-game-io.svg?branch=master)](https://travis-ci.org/robertrypula/terminal-game-io)
[![Coverage Status](https://coveralls.io/repos/github/robertrypula/terminal-game-io/badge.svg?branch=master)](https://coveralls.io/github/robertrypula/terminal-game-io?branch=master)
[![dependencies Status](https://david-dm.org/robertrypula/terminal-game-io/status.svg)](https://david-dm.org/robertrypula/terminal-game-io)
[![devDependencies Status](https://david-dm.org/robertrypula/terminal-game-io/dev-status.svg)](https://david-dm.org/robertrypula/terminal-game-io?type=dev)

It's never been easier to start writing ASCII games in NodeJs or browser. This package handles for you basic input (keyboard events) and output (ASCII 'frame').

NodeJs terminal example:

[![Terminal example](https://cdn.rypula.pl/terminal-game-io/demo-node.gif)](https://cdn.rypula.pl/terminal-game-io/demo-node.gif) 

Browser example:

[![Terminal example](https://cdn.rypula.pl/terminal-game-io/demo-browser.gif)](https://cdn.rypula.pl/terminal-game-io/demo-browser.gif)

You can check the browser example [here](https://cdn.rypula.pl/terminal-game-io/v3.0.0-rc/demo-browser.html)

Interactive code examples available on CodeSandbox.io:
- Clean JavaScript example [here](https://codesandbox.io/s/4m94kx0z9)
- Clean JavaScript example with mobile device support [here](https://codesandbox.io/s/nrll993jvm)
- Angular example [here](https://codesandbox.io/s/y04l1l1069)
  
## Installation

```
npm install terminal-game-io
```

## Changelog

### Still TODO

- render the frame only if it's different than previous (easy performance fix)
- render only part that really changed (more complex performance fix)
- use requestAnimationFrame
- write unit tests

### v3.0.0 - ?? September 2018
- remove externals ('process' and 'readline')
- split main class into two (one for node, one for browser)
- normalize keyNames, currently there is a mismatch between node and browser
- remove write method
- fix mobile buttons on demo apps
- add keyName constants

### v1.x.x/v2.x.x - August/September 2018
- export env utils (isBrowser, isNode)
- add ability to change DOM element id
- add ability to trigger keypress handler from other sources (mouse click, swipe event)
- fix error with node environment detection

## Simplest example - NodeJs, clean JavaScript

Just follow the installation instruction and create `test.js` file with the content below. At the end execute the `node test.js` command.

```javascript
const TerminalGameIo = require('terminal-game-io');

const FPS = 5;
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 12;

let terminalGameIo;
let posX = Math.round(BOARD_WIDTH / 2);
let posY = Math.round(BOARD_HEIGHT / 2);

const frameHandler = (instance) => {
  let frameData = '';

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      frameData += (posX === x && posY === y) ? '@' : '.';
    }
  }
  instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
};

const keypressHandler = (instance, keyName) => {
  switch (keyName) {
    case 'ArrowDown':
      posY = (posY + 1) % BOARD_HEIGHT;
      break;
    case 'ArrowUp':
      posY = posY === 0 ? BOARD_HEIGHT - 1 : posY - 1;
      break;
    case 'ArrowLeft':
      posX = posX === 0 ? BOARD_WIDTH - 1 : posX - 1;
      break;
    case 'ArrowRight':
      posX = (posX + 1) % BOARD_WIDTH;
      break;
    case 'Escape':
      instance.exit();
      break;
  }

  frameHandler(instance);
};

terminalGameIo = TerminalGameIo.createTerminalGameIo({
  fps: FPS,
  frameHandler,
  keypressHandler
});
```

## Simplest example - browser, clean JavaScript

Running in browser is also easy. Just create `index.html` with the content below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Terminal Game IO</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body onLoad="run()">
  <pre id="root"></pre>

  <script>
    var FPS = 5;
    var BOARD_WIDTH = 40;
    var BOARD_HEIGHT = 12;

    var terminalGameIo;
    var posX = Math.round(BOARD_WIDTH / 2);
    var posY = Math.round(BOARD_HEIGHT / 2);

    function frameHandler(instance) {
      var frameData = '';

      for (var y = 0; y < BOARD_HEIGHT; y++) {
        for (var x = 0; x < BOARD_WIDTH; x++) {
          frameData += (posX === x && posY === y) ? '@' : '.';
        }
      }
      instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
    }

    function keypressHandler(instance, keyName) {
      frameHandler(instance);

      switch (keyName) {
        case 'ArrowDown':
          posY = (posY + 1) % BOARD_HEIGHT;
          break;
        case 'ArrowUp':
          posY = posY === 0 ? BOARD_HEIGHT - 1 : posY - 1;
          break;
        case 'ArrowLeft':
          posX = posX === 0 ? BOARD_WIDTH - 1 : posX - 1;
          break;
        case 'ArrowRight':
          posX = (posX + 1) % BOARD_WIDTH;
          break;
        case 'Escape':
          instance.exit();
          break;
      }
    }

    function run() {
      terminalGameIo = TerminalGameIo.createTerminalGameIo({
        // domElementId: 'my-custom-id',     // default: 'root'
        fps: FPS,
        frameHandler: frameHandler,
        keypressHandler: keypressHandler
      });
    }
  </script>
  <script src="https://unpkg.com/terminal-game-io"></script>
</html>
```

## Want to check this project in development mode?

```
git clone https://github.com/robertrypula/terminal-game-io.git
cd terminal-game-io
npm install

npm run dev-node
```

This library can run also in the browser:

```
npm run dev-browser
```

## Licence

The MIT License (MIT)

Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula/terminal-game-io

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
