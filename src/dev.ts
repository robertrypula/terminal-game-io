// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import {
  createTerminalGameIo,
  FrameHandler,
  ITerminalGameIo,
  Key,
  KeyName,
  KeypressHandler
} from './lib';     // in your application replace it to: } from 'terminal-game-io';

const FPS = 5;
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 12;

let terminalGameIo: ITerminalGameIo;
let lastKeyName = '';
let posX = Math.round(BOARD_WIDTH / 2);
let posY = Math.round(BOARD_HEIGHT / 2);
let frameNumber = 0;

const frameHandler: FrameHandler = (instance: ITerminalGameIo) => {
  const lines: string[] = [];
  let frameData = '';

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      frameData += (posX === x && posY === y) ? '@' : '.';
    }
  }

  lines.push(
    'Frame: ' + (frameNumber++),
    'Time: ' + instance.getTime().toFixed(3) + 's',
    'Last key name: ' + lastKeyName,
    '',
    'Use arrows to move.',
    'Press Escape to exit...'
  );
  for (let i = 0; i < lines.length; i++) {
    frameData = addLine(frameData, lines[i], BOARD_WIDTH);
  }

  instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT + lines.length);
};

const addLine = (frameData: string, line: string, lineWidth: number): string => {
  return line.length > lineWidth
    ? frameData + line.substr(0, lineWidth)
    : frameData + line + (new Array(lineWidth - line.length + 1).join(' '));
};

const keypressHandler: KeypressHandler = (instance: ITerminalGameIo, keyName: KeyName) => {
  lastKeyName = keyName;

  switch (keyName) {
    case Key.ArrowDown:
      posY = (posY + 1) % BOARD_HEIGHT;
      break;
    case Key.ArrowUp:
      posY = posY === 0 ? BOARD_HEIGHT - 1 : posY - 1;
      break;
    case Key.ArrowLeft:
      posX = posX === 0 ? BOARD_WIDTH - 1 : posX - 1;
      break;
    case Key.ArrowRight:
      posX = (posX + 1) % BOARD_WIDTH;
      break;
    case Key.Escape:
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
