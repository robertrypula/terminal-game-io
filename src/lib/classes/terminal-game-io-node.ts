// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { ITerminalGameIo, ITerminalGameIoOptions, process } from '..';
import { AbstractTerminalGameIo } from './abstract-terminal-game-io';

const CSI = String.fromCharCode(27) + '[';
const cursorPosition = (x: number, y: number) => `${CSI}${y};${y}H`;

export class TerminalGameIoNode extends AbstractTerminalGameIo implements ITerminalGameIo {
  public constructor(options: ITerminalGameIoOptions) {
    super(options);
  }

  public write(value: string): void {
    process.stdout.write(value);
  }

  protected cleanupBeforeExit(): void {
    process.stdin.removeAllListeners();
    process.exit();
  }

  protected clear(): void {
    this.write(cursorPosition(1, 1));
  }

  protected initializeEvents(): void {
    process.stdin.setRawMode(true);
    process.stdin.on('data', (buffer: Buffer) => {
      const data: any[] = buffer.toJSON().data;
      let keyName = '';

      if (data.length === 1 && data[0] === 27) {
        keyName = 'escape';
      } else if (data.length === 1 && data[0] === 32) {
        keyName = 'space';
      } else if (data.length === 1 && data[0] === 13) {
        keyName = 'enter';
      } else if (data.length === 3 && data[0] === 27 && data[1] === 91 && data[2] === 65) {
        keyName = 'up';
      } else if (data.length === 3 && data[0] === 27 && data[1] === 91 && data[2] === 66) {
        keyName = 'down';
      } else if (data.length === 3 && data[0] === 27 && data[1] === 91 && data[2] === 67) {
        keyName = 'right';
      } else if (data.length === 3 && data[0] === 27 && data[1] === 91 && data[2] === 68) {
        keyName = 'left';
      }
      // console.log('onData', keyName, data); // TODO remove me
      this.keypressHandler(this, keyName);
    });
  }

  protected initialize(): void {
    this.initializeEvents();
    this.intervalId = setInterval(() => this.frameHandler(this), this.frameDuration);
    this.active = true;
  }
}
