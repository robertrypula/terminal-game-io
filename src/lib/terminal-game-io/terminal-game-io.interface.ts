// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

export interface ITerminalGameIo {
  drawFrame(frameData: string, width: number, height: number): void;
  exit(): void;
  getTime(): number;
  triggerKeypress(keyName: string): void;
  write(value: string): void;
}

export interface ITerminalGameIoOptions {
  domElementId?: string;
  fps: number;
  frameHandler: FrameHandler;
  keypressHandler: KeypressHandler;
}

export interface ITerminalGameIoStatic {
  new(
    terminalGameIoOptions: ITerminalGameIoOptions
  ): ITerminalGameIo;
}

export type FrameHandler = (instance: ITerminalGameIo) => void;
export type KeypressHandler = (instance: ITerminalGameIo, keyName: string) => void;

export type TerminalGameIoFactory = (terminalGameIoOptions: ITerminalGameIoOptions) => ITerminalGameIo;
