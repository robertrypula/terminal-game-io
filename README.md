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

## Example - NodeJs, pure JavaScript

```javascript
const TerminalGameIo = require('terminal-game-io').TerminalGameIo;

const FPS = 5;
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 12;

let terminalGameIo;
let lastKeyName = '';
let posX = Math.round(BOARD_WIDTH / 2);
let posY = Math.round(BOARD_HEIGHT / 2);
let frameNumber = 0;

const keypressHandler = (time, keyName) => {
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
      terminalGameIo.exit();
      break;
  }

  frameHandler(time);
};

const frameHandler = (time) => {
  let frameData = '';

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      frameData += (posX === x && posY === y) ? '@' : '.';
    }
  }

  terminalGameIo.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
  terminalGameIo.write('Frame: ' + (frameNumber++) + '\n');
  terminalGameIo.write('Time: ' + time.toFixed(3) + 's\n');
  terminalGameIo.write('Last key name: ' + lastKeyName + '                \n\n');
  terminalGameIo.write('Use arrows to move.\n');
  terminalGameIo.write('Press Escape to exit...\n');
};

terminalGameIo = new TerminalGameIo(keypressHandler, frameHandler, FPS);
```

## Example - TypeScript

```typescript
import { FrameHandler, KeypressHandler, TerminalGameIo } from 'terminal-game-io';

const FPS = 5;
const BOARD_WIDTH = 80;
const BOARD_HEIGHT = 24;

let terminalGameIo: TerminalGameIo;
let lastKeyName = '';
let posX = 0;
let posY = 0;
let frameNumber = 0;

const keypressHandler: KeypressHandler = (time: number, keyName: string) => {
  lastKeyName = keyName;

  switch (keyName) {
    case 'down':
      posY++;
      break;
    case 'up':
      posY--;
      break;
    case 'left':
      posX--;
      break;
    case 'right':
      posX++;
      break;
    case 'escape':
      terminalGameIo.exit();
      break;
  }

  frameHandler(time);
};

const frameHandler: FrameHandler = (time: number) => {
  let frame = '';

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      frame += (posX === x && posY === y) ? '@' : '.';
    }
  }

  terminalGameIo.draw(frame, BOARD_WIDTH, BOARD_HEIGHT);
  terminalGameIo.write('Frame: ' + (frameNumber++) + '\n');
  terminalGameIo.write('Time: ' + time.toFixed(3) + 's\n');
  terminalGameIo.write('Last key name: ' + lastKeyName + '                \n\n');
  terminalGameIo.write('Press Escape to exit...\n');
};

terminalGameIo = new TerminalGameIo(keypressHandler, frameHandler, FPS);
```

## Example - 'web terminal' in your browser in pure JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Terminal Game UI - web demo</title>
  <script src="https://unpkg.com/terminal-game-io"></script>
</head>
<body>
  <pre id="terminal-game-io"></pre>

  <script>
    const FPS = 5;
    const BOARD_WIDTH = 40;
    const BOARD_HEIGHT = 12;

    let terminalGameIo;
    let lastKeyName = '';
    let posX = Math.round(BOARD_WIDTH / 2);
    let posY = Math.round(BOARD_HEIGHT / 2);
    let frameNumber = 0;

    const keypressHandler = (time, keyName) => {
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
          terminalGameIo.exit();
          break;
      }

      frameHandler(time);
    };

    const frameHandler = (time) => {
      let frameData = '';

      for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
          frameData += (posX === x && posY === y) ? '@' : '.';
        }
      }

      terminalGameIo.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
      terminalGameIo.write('Frame: ' + (frameNumber++) + '\n');
      terminalGameIo.write('Time: ' + time.toFixed(3) + 's\n');
      terminalGameIo.write('Last key name: ' + lastKeyName + '                \n\n');
      terminalGameIo.write('Use arrows to move.\n');
      terminalGameIo.write('Press Escape to exit...\n');
    };

    terminalGameIo = new TerminalGameIo.TerminalGameIo(keypressHandler, frameHandler, FPS);
  </script>
</body>
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
