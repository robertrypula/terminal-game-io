// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { isBrowser, isNode } from '..';
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

  // TODO split into two classes - one for node, one for browser
  if (isNode) {
    factoryClass = TerminalGameIoCommon;
  } else if (isBrowser) {
    factoryClass = TerminalGameIoCommon;
  } else {
    throw new Error('Unable to create TerminalGameIo object due to environment detection problem.');
  }

  return new factoryClass(terminalGameIoOptions);
};
