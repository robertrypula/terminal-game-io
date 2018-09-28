// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { KeyName } from '..';
import {
  AbstractFrameHandler,
  AbstractKeypressHandler,
  IAbstractTerminalGameIo,
  IAbstractTerminalGameIoOptions
} from '../models/abstract-terminal-game-io.interface';

export abstract class AbstractTerminalGameIo implements IAbstractTerminalGameIo {
  protected active: boolean;
  protected frameDuration: number;
  protected frameHandler: AbstractFrameHandler;
  protected intervalId: any;
  protected keypressHandler: AbstractKeypressHandler;
  protected startTime: number;

  protected constructor(options: IAbstractTerminalGameIoOptions) {
    this.frameDuration = Math.round(1000 / options.fps);
    this.frameHandler = options.frameHandler;
    this.keypressHandler = options.keypressHandler;
    this.startTime = new Date().getTime();

    this.initialize();
    this.frameHandler(this);
  }

  public drawFrame(data: string, width: number, height: number): void {
    let fullFrame = '';
    let index = 0;
    let line: string;

    if (!this.active) {
      return;
    }

    if (data.length !== width * height) {
      throw new Error('Frame data is not matching drawFrame dimensions');
    }

    this.clear();
    for (let y = 0; y < height; y++) {
      line = '';
      for (let x = 0; x < width; x++) {
        line += data[index++];
      }
      fullFrame += line + '\n';
    }
    this.write(fullFrame);
  }

  public exit(): void {
    this.active = false;
    clearInterval(this.intervalId);
    this.finalCleanup();
  }

  public getTime(): number {
    const now = new Date().getTime();
    const difference = now - this.startTime;

    return difference / 1000;
  }

  public triggerKeypress(keyName: KeyName | string): void {
    if (!this.active) {
      return;
    }

    this.keypressHandler(this, keyName);
  }

  protected abstract clear(): void;

  protected abstract finalCleanup(): void;

  protected initialize(): void {
    this.initializeEvents();
    this.intervalId = setInterval(() => this.frameHandler(this), this.frameDuration);
    this.active = true;
  }

  protected abstract initializeEvents(): void;

  protected abstract write(value: string): void;
}
