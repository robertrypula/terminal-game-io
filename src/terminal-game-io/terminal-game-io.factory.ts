// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula/terminal-game-io

import { TerminalGameIoCommon } from './terminal-game-io-common/terminal-game-io-common';
import {
  ITerminalGameIoOptions,
  ITerminalGameIoStatic,
  TerminalGameIoFactory
} from './terminal-game-io.interface';

export const createTerminalGameIo: TerminalGameIoFactory = (
  terminalGameIoOptions: ITerminalGameIoOptions
) => {
  let factoryClass: ITerminalGameIoStatic;

  // TODO split into two classes - one for console, one for web
  factoryClass = TerminalGameIoCommon;

  return new factoryClass(terminalGameIoOptions);
};
