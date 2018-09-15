// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import * as fromEnvUtils from '../../env-utils/env-utils';
import {
  FrameHandler,
  ITerminalGameIo,
  ITerminalGameIoOptions,
  KeypressHandler
} from '../terminal-game-io.interface';

const CSI = String.fromCharCode(0x1b) + '[';

export class TerminalGameIoCommon implements ITerminalGameIo {
  protected domElementId: string;
  protected frameDuration: number;
  protected frameHandler: FrameHandler;
  protected intervalId: any;
  protected keypressHandler: KeypressHandler;
  protected startTime: number;
  protected active: boolean;

  constructor(terminalGameIoOptions: ITerminalGameIoOptions) {
    this.domElementId = terminalGameIoOptions.domElementId
      ? terminalGameIoOptions.domElementId
      : 'root';
    this.frameDuration = Math.round(1000 / terminalGameIoOptions.fps);
    this.frameHandler = terminalGameIoOptions.frameHandler;
    this.keypressHandler = terminalGameIoOptions.keypressHandler;
    this.startTime = new Date().getTime();

    this.initialize();
    this.frameHandler(this);
  }

  public drawFrame(frameData: string, width: number, height: number): void {
    let index: number = 0;
    let line: string;

    if (frameData.length !== width * height) {
      throw new Error('Frame data is not matching drawFrame dimensions');
    }

    this.clear();
    for (let y = 0; y < height; y++) {
      line = '';
      for (let x = 0; x < width; x++) {
        line += frameData[index++];
      }
      this.write(line + '\n');
    }
  }

  public write(value: string): void {
    let domElement;

    // TODO remove condition by splitting code into two classes
    if (fromEnvUtils.process) {
      // fromEnvUtils.process.stdout.write(value);
    } else if (fromEnvUtils.isBrowser) {
      domElement = fromEnvUtils.getElementById(this.domElementId);
      if (domElement) {
        domElement.innerHTML = domElement.innerHTML + value;
      }
    }
  }

  public exit(): void {
    clearInterval(this.intervalId);

    // TODO remove condition by splitting code into two classes
    if (fromEnvUtils.process) {
      fromEnvUtils.process.stdin.removeAllListeners();
      fromEnvUtils.process.exit();
    } else if (fromEnvUtils.isBrowser) {
      document.removeEventListener('keydown', this.keydownEventListener);
    }
    this.active = false;
  }

  public getTime(): number {
    const now = new Date().getTime();
    const difference = now - this.startTime;

    return difference / 1000;
  }

  public triggerKeypress(keyName: string): void {
    if (this.active) {
      this.keypressHandler(this, keyName);
    }
  }

  protected clear(): void {
    let domElement;

    // TODO remove condition by splitting code into two classes
    if (fromEnvUtils.process) {
      // fromEnvUtils.process.stdout.write(CSI + 1 + ';' + 1 + 'H');
    } else if (fromEnvUtils.isBrowser) {
      domElement = fromEnvUtils.getElementById(this.domElementId);
      if (domElement) {
        domElement.innerHTML = '';
      }
    }
  }

  protected initialize() {
    // TODO remove condition by splitting code into two classes
    if (fromEnvUtils.isNode) {
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
        console.log('onData', keyName, data);
        this.keypressHandler(this, keyName);
      });
    } else if (fromEnvUtils.isBrowser) {
      document.addEventListener('keydown', this.keydownEventListener);
    }
    this.intervalId = setInterval(() => this.frameHandler(this), this.frameDuration);
    this.active = true;
  }

  protected keydownEventListener = (e: KeyboardEvent) => {
    this.keypressHandler(this, e.key);
  }
}
