import {FrameHandler, KeypressHandler, TerminalGameIo} from '../src/index';

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
      frame += (posX === x && posY === y)
        ? '@'
        : '.';
    }
  }

  terminalGameIo.draw(frame.split(''), BOARD_WIDTH, BOARD_HEIGHT);
  console.log('Frame: ' + (frameNumber++));
  console.log('Time: ' + time.toFixed(3) + 's');
  console.log('Last key name: ' + lastKeyName + '                ');
};

let terminalGameIo = new TerminalGameIo(keypressHandler, frameHandler, 5);
