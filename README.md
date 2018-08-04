# Terminal Games IO

[![npm version](https://badge.fury.io/js/terminal-games-io.svg)](https://badge.fury.io/js/terminal-games-io)
[![Build Status](https://travis-ci.org/robertrypula/terminal-games-io.svg?branch=master)](https://travis-ci.org/robertrypula/terminal-games-io)
[![Coverage Status](https://coveralls.io/repos/github/robertrypula/terminal-games-io/badge.svg?branch=master)](https://coveralls.io/github/robertrypula/terminal-games-io?branch=master)
[![dependencies Status](https://david-dm.org/robertrypula/terminal-games-io/status.svg)](https://david-dm.org/robertrypula/terminal-games-io)
[![devDependencies Status](https://david-dm.org/robertrypula/terminal-games-io/dev-status.svg)](https://david-dm.org/robertrypula/terminal-games-io?type=dev)

Wrapper for NodeJs that allows to write simple terminal games. It supports basic output (ASCII 'frame') and input (keypress events)

## Installation

```
npm install terminal-games-io --save
```

## Usage

```typescript
import { FrameHandler, KeypressHandler, TerminalGameIo } from 'terminal-games-io';

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

## Want to check this project in development mode?

```
git clone https://github.com/robertrypula/terminal-game-io.git
cd terminal-game-io
npm install
npm run demo
```

## Licence

The MIT License (MIT)

Copyright (c) 2015-2018 Robert Rypuła

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

