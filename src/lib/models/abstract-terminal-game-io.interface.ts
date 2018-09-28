// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { KeyName } from './key-name.interface';

export interface IAbstractTerminalGameIo {
  drawFrame(data: string, width: number, height: number): void;
  exit(): void;
  getTime(): number;
  triggerKeypress(keyName: KeyName | string): void;
}

export interface IAbstractTerminalGameIoOptions {
  fps: number;
  frameHandler: AbstractFrameHandler;
  keypressHandler: AbstractKeypressHandler;
}

export type AbstractFrameHandler = (instance: IAbstractTerminalGameIo) => void;
export type AbstractKeypressHandler = (instance: IAbstractTerminalGameIo, keyName: KeyName | string) => void;
