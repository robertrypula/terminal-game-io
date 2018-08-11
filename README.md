# Terminal Game IO

[![npm version](https://badge.fury.io/js/terminal-game-io.svg)](https://badge.fury.io/js/terminal-game-io)
[![Build Status](https://travis-ci.org/robertrypula/terminal-game-io.svg?branch=master)](https://travis-ci.org/robertrypula/terminal-game-io)
[![Coverage Status](https://coveralls.io/repos/github/robertrypula/terminal-game-io/badge.svg?branch=master)](https://coveralls.io/github/robertrypula/terminal-game-io?branch=master)
[![dependencies Status](https://david-dm.org/robertrypula/terminal-game-io/status.svg)](https://david-dm.org/robertrypula/terminal-game-io)
[![devDependencies Status](https://david-dm.org/robertrypula/terminal-game-io/dev-status.svg)](https://david-dm.org/robertrypula/terminal-game-io?type=dev)

It's never been easier to start writing terminal games in NodeJs. This package handles for you basic input (keyboard events) and output (ASCII 'frame').

[![Terminal example](https://cdn.rypula.pl/terminal-game-io/terminal.gif)](https://cdn.rypula.pl/terminal-game-io/terminal.gif) 

If you like to share your games directly in the browser don't worry - simple 'web terminal' emulator is supported too!

[![Terminal example](https://cdn.rypula.pl/terminal-game-io/web-browser.gif)](https://cdn.rypula.pl/terminal-game-io/web-browser.gif)

## Installation

```
npm install terminal-game-io --save
```

## TODO

- export env utils (isBrowser, isNode)
- add ability to change DOM element id
- split main class into two (one for node, one for browser)
- write unit tests
- use requestAnimationFrame
- normalize keyNames, currently there is a mismatch between node and browser

## Example - NodeJs, pure JavaScript

Just follow the installation instruction and create `test.js` file with the content below. At the end execute the `node test.js` command.

```javascript
const TerminalGameIo = require('terminal-game-io');
const createTerminalGameIo = TerminalGameIo.createTerminalGameIo;

const FPS = 5;
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 12;

let terminalGameIo;
let lastKeyName = '';
let posX = Math.round(BOARD_WIDTH / 2);
let posY = Math.round(BOARD_HEIGHT / 2);
let frameNumber = 0;

const frameHandler = (instance) => {
  let frameData = '';

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      frameData += (posX === x && posY === y) ? '@' : '.';
    }
  }

  instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
  instance.write('Frame: ' + (frameNumber++) + '\n');
  instance.write('Time: ' + instance.getTime().toFixed(3) + 's\n');
  instance.write('Last key name: ' + lastKeyName + '                \n\n');
  instance.write('Use arrows to move.\n');
  instance.write('Press Escape to exit...\n');
};

const keypressHandler = (instance, keyName) => {
  lastKeyName = keyName;

  switch (keyName) {
    case 'down':
      posY = (posY + 1) % BOARD_HEIGHT;
      break;
    case 'up':
      posY = posY === 0 ? BOARD_HEIGHT - 1 : posY - 1;
      break;
    case 'left':
      posX = posX === 0 ? BOARD_WIDTH - 1 : posX - 1;
      break;
    case 'right':
      posX = (posX + 1) % BOARD_WIDTH;
      break;
    case 'escape':
      instance.exit();
      break;
  }

  frameHandler(instance);
};

terminalGameIo = createTerminalGameIo({
  fps: FPS,
  frameHandler,
  keypressHandler
});
```

## Example - TypeScript

```typescript
import {
  createTerminalGameIo,
  FrameHandler,
  ITerminalGameIo,
  KeypressHandler
} from 'terminal-game-io'; 

const FPS = 5;
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 12;

let terminalGameIo: ITerminalGameIo;
let lastKeyName = '';
let posX = Math.round(BOARD_WIDTH / 2);
let posY = Math.round(BOARD_HEIGHT / 2);
let frameNumber = 0;

const frameHandler: FrameHandler = (instance: ITerminalGameIo) => {
  let frameData = '';

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      frameData += (posX === x && posY === y) ? '@' : '.';
    }
  }

  instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
  instance.write('Frame: ' + (frameNumber++) + '\n');
  instance.write('Time: ' + instance.getTime().toFixed(3) + 's\n');
  instance.write('Last key name: ' + lastKeyName + '                \n\n');
  instance.write('Use arrows to move.\n');
  instance.write('Press Escape to exit...\n');
};

const keypressHandler: KeypressHandler = (instance: ITerminalGameIo, keyName: string) => {
  lastKeyName = keyName;

  switch (keyName) {
    case 'down':
      posY = (posY + 1) % BOARD_HEIGHT;
      break;
    case 'up':
      posY = posY === 0 ? BOARD_HEIGHT - 1 : posY - 1;
      break;
    case 'left':
      posX = posX === 0 ? BOARD_WIDTH - 1 : posX - 1;
      break;
    case 'right':
      posX = (posX + 1) % BOARD_WIDTH;
      break;
    case 'escape':
      instance.exit();
      break;
  }

  frameHandler(instance);
};

terminalGameIo = createTerminalGameIo({
  fps: FPS,
  frameHandler,
  keypressHandler
});
```

## Example - 'web terminal' in your browser in pure JavaScript

Running in browser is also easy. Just create `index.html` with the content below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Terminal Game UI - web demo</title>
</head>
<body onLoad="run()">
  <pre id="root"></pre>

  <script>
    var FPS = 5;
    var BOARD_WIDTH = 40;
    var BOARD_HEIGHT = 12;

    var terminalGameIo;
    var lastKeyName = '';
    var posX = Math.round(BOARD_WIDTH / 2);
    var posY = Math.round(BOARD_HEIGHT / 2);
    var frameNumber = 0;

    function frameHandler(instance) {
      var frameData = '';

      for (var y = 0; y < BOARD_HEIGHT; y++) {
        for (var x = 0; x < BOARD_WIDTH; x++) {
          frameData += (posX === x && posY === y) ? '@' : '.';
        }
      }

      instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
      instance.write('Frame: ' + (frameNumber++) + '\n');
      instance.write('Time: ' + instance.getTime().toFixed(3) + 's\n');
      instance.write('Last key name: ' + lastKeyName + '\n\n');
      instance.write('Use arrows to move.\n');
      instance.write('Press Escape to exit...\n');
    }

    function keypressHandler(instance, keyName) {
      lastKeyName = keyName;

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
    }

    function run() {
      terminalGameIo = new TerminalGameIo.createTerminalGameIo({
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

npm run demo
```

This library supports also web mode:

```
npm run demo-web
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
