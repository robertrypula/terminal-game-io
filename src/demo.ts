// Copyright (c) 2015-2018 Robert Rypuła

import { FrameHandler, KeypressHandler, TerminalGameIo } from './index';

const BOARD_WIDTH = 80;
const BOARD_HEIGHT = 24;

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

const terminalGameIo = new TerminalGameIo(keypressHandler, frameHandler, 5);
