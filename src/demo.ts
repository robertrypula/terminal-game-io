// Copyright (c) 2018 Robert Rypuła

import { FrameHandler, KeypressHandler, TerminalGameIo } from './terminal-game-io';

const FPS = 5;
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 12;

let terminalGameIo: TerminalGameIo;
let lastKeyName = '';
let posX = Math.round(BOARD_WIDTH / 2);
let posY = Math.round(BOARD_HEIGHT / 2);
let frameNumber = 0;

const keypressHandler: KeypressHandler = (time: number, keyName: string) => {
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

const frameHandler: FrameHandler = (time: number) => {
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
  terminalGameIo.write('Use cursors to move.\n');
  terminalGameIo.write('Press Escape to exit...\n');
};

terminalGameIo = new TerminalGameIo(keypressHandler, frameHandler, FPS);
