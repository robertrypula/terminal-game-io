// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import {
  FrameHandler,
  ITerminalGameIo,
  ITerminalGameIoOptions,
  KeypressHandler
} from '../terminal-game-io.interface';

export abstract class TerminalGameIoCommon implements ITerminalGameIo {
  protected active: boolean;
  protected frameDuration: number;
  protected frameHandler: FrameHandler;
  protected intervalId: any;
  protected keypressHandler: KeypressHandler;
  protected startTime: number;

  protected constructor(options: ITerminalGameIoOptions) {
    this.frameDuration = Math.round(1000 / options.fps);
    this.frameHandler = options.frameHandler;
    this.keypressHandler = options.keypressHandler;
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

  public abstract exit(): void;

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

  public abstract write(value: string): void;

  protected abstract clear(): void;

  protected abstract initialize(): void;

  protected keydownEventListener = (e: KeyboardEvent): void => {
    this.keypressHandler(this, e.key);
  }
}
