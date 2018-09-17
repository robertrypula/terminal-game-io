// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { isBrowser, isNode } from '..';
import { TerminalGameIoBrowser } from './terminal-game-io-browser/terminal-game-io-browser';
import { TerminalGameIoNode } from './terminal-game-io-node/terminal-game-io-node';
import {
  ITerminalGameIoOptions,
  ITerminalGameIoStatic,
  TerminalGameIoFactory
} from './terminal-game-io.interface';

export const createTerminalGameIo: TerminalGameIoFactory = (
  options: ITerminalGameIoOptions
) => {
  let factoryClass: ITerminalGameIoStatic;

  if (isNode) {
    factoryClass = TerminalGameIoNode;
  } else if (isBrowser) {
    factoryClass = TerminalGameIoBrowser;
  } else {
    throw new Error('Unable to create TerminalGameIo object due to environment detection problem.');
  }

  return new factoryClass(options);
};
