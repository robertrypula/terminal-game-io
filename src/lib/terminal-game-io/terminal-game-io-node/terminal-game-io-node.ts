// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import * as fromEnvUtils from '../../env-utils/env-utils';
import { TerminalGameIoCommon } from '../terminal-game-io-common/terminal-game-io-common';
import { ITerminalGameIo, ITerminalGameIoOptions } from '../terminal-game-io.interface';

const CSI = String.fromCharCode(0x1b) + '[';

export class TerminalGameIoNode extends TerminalGameIoCommon implements ITerminalGameIo {
  constructor(options: ITerminalGameIoOptions) {
    super(options);
  }

  public write(value: string): void {
    fromEnvUtils.process.stdout.write(value);
  }

  public exit(): void {
    clearInterval(this.intervalId);

    fromEnvUtils.process.stdin.removeAllListeners();
    fromEnvUtils.process.exit();
    this.active = false;
  }

  protected clear(): void {
    fromEnvUtils.process.stdout.write(CSI + 1 + ';' + 1 + 'H');
  }

  protected initialize() {
    fromEnvUtils.process.stdin.setRawMode(true);
    fromEnvUtils.process.stdin.on('data', (buffer: Buffer) => {
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
    this.intervalId = setInterval(() => this.frameHandler(this), this.frameDuration);
    this.active = true;
  }
}
