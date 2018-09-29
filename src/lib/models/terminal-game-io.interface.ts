// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { IAbstractTerminalGameIo, IAbstractTerminalGameIoOptions } from './abstract-terminal-game-io.interface';
import { KeyName } from './key-name.interface';

/*tslint:disable-next-line:no-empty-interface*/
export interface ITerminalGameIo extends IAbstractTerminalGameIo { }

export interface ITerminalGameIoOptions extends IAbstractTerminalGameIoOptions {
  domElementId?: string;
  frameHandler: FrameHandler;
  keypressHandler: KeypressHandler;
}

export interface ITerminalGameIoStatic {
  new(
    terminalGameIoOptions: ITerminalGameIoOptions
  ): ITerminalGameIo;
}

export type TerminalGameIoFactory = (options: ITerminalGameIoOptions) => ITerminalGameIo;

export type FrameHandler = (instance: ITerminalGameIo) => void;
export type KeypressHandler = (instance: ITerminalGameIo, keyName: KeyName) => void;
