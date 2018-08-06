// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula/terminal-game-io

import * as nodeProcess from 'process';
import * as nodeReadline from 'readline';

export const process: NodeJS.Process =
  nodeProcess ? nodeProcess : null;

export const emitKeypressEvents: (stream: NodeJS.ReadableStream, _interface?: nodeReadline.ReadLine) => void =
  nodeReadline ? nodeReadline.emitKeypressEvents : null;
