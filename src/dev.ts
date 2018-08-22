// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula/terminal-game-io

import {
  createTerminalGameIo,
  FrameHandler,
  ITerminalGameIo,
  KeypressHandler
} from './main';     // in your application replace it to: } from 'terminal-game-io';

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
