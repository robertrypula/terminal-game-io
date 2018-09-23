// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

export interface IAbstractTerminalGameIo {
  drawFrame(data: string, width: number, height: number): void;
  exit(): void;
  getTime(): number;
  triggerKeypress(keyName: string): void;
  write(value: string): void;
}

export interface IAbstractTerminalGameIoOptions {
  fps: number;
  frameHandler: AbstractFrameHandler;
  keypressHandler: AbstractKeypressHandler;
}

export type AbstractFrameHandler = (instance: IAbstractTerminalGameIo) => void;
export type AbstractKeypressHandler = (instance: IAbstractTerminalGameIo, keyName: string) => void;
