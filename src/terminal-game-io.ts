// Copyright (c) 2018 Robert Rypuła

import * as readline from 'readline';

const csi = String.fromCharCode(0x1b) + '[';

export type KeypressHandler = (time: number, keyName: string) => void;
export type FrameHandler = (time: number) => void;

export class TerminalGameIo {
  protected intervalId: any;
  protected startTime: number;
  protected frameDuration: number;
  protected keypressHandler: KeypressHandler;
  protected frameHandler: FrameHandler;

  constructor(
    keypressHandler: KeypressHandler,
    frameHandler: FrameHandler,
    fps: number
  ) {
    this.keypressHandler = keypressHandler;
    this.frameHandler = frameHandler;
    this.frameDuration = Math.round(1000 / fps);
    this.startTime = new Date().getTime();
    this.initialize();
    setTimeout(() => this.frameHandler(this.getTime()), 0);
  }

  public drawFrame(frameData: string, width: number, height: number): void {
    let index = 0;
    let line;

    if (frameData.length !== width * height) {
      throw new Error('Frame data is not matching drawFrame dimensions');
    }

    this.goto(1, 1);
    for (let y = 0; y < height; y++) {
      line = '';
      for (let x = 0; x < width; x++) {
        line += frameData[index++];
      }
      this.write(line + '\n');
    }
  }

  public write(value: string): void {
    process.stdout.write(value);
  }

  public exit(): void {
    clearInterval(this.intervalId);
    process.exit();
  }

  public goto(x: number, y: number): void {
    process.stdout.write(csi + y + ';' + x + 'H');
  }

  protected getTime(): number {
    const now = new Date().getTime();
    const difference = now - this.startTime;

    return difference / 1000;
  }

  protected initialize() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
      this.keypressHandler(this.getTime(), key.name);
    });
    this.intervalId = setInterval(() => this.frameHandler(this.getTime()), this.frameDuration);
  }
}
