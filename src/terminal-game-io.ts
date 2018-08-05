// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula/terminal-game-io

import * as process from 'process';
import * as readline from 'readline';

const CSI = String.fromCharCode(0x1b) + '[';
const isBrowser = () => typeof document !== 'undefined';
const getDomElement = () => document.getElementById('terminal-game-io');

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

    // TODO remove condition by spliting code into two classes
    if (process) {
      process.stdout.write(value);
    } else if (isBrowser()) {
      domElement = getDomElement();
      if (domElement) {
        domElement.innerHTML = domElement.innerHTML + value;
      }
    }
  }

  public exit(): void {
    clearInterval(this.intervalId);

    // TODO remove condition by spliting code into two classes
    if (process) {
      process.exit();
    } else if (isBrowser()) {
      document.removeEventListener('keydown', this.keydownEventListener);
    }
  }

  protected keydownEventListener = (e: KeyboardEvent) => {
    this.keypressHandler(this.getTime(), e.key);
  }

  protected clear(): void {
    let domElement;

    // TODO remove condition by spliting code into two classes
    if (process) {
      process.stdout.write(CSI + 1 + ';' + 1 + 'H');
    } else if (isBrowser()) {
      domElement = getDomElement();
      if (domElement) {
        domElement.innerHTML = '';
      }
    }
  }

  protected getTime(): number {
    const now = new Date().getTime();
    const difference = now - this.startTime;

    return difference / 1000;
  }

  protected initialize() {
    // TODO remove condition by spliting code into two classes
    if (readline) {
      readline.emitKeypressEvents(process.stdin);
      process.stdin.setRawMode(true);
      process.stdin.on('keypress', (str, key) => {
        this.keypressHandler(this.getTime(), key.name);
      });
    } else if (isBrowser()) {
      document.addEventListener('keydown', this.keydownEventListener);
    }
    this.intervalId = setInterval(() => this.frameHandler(this.getTime()), this.frameDuration);
  }
}
