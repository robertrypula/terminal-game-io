// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula/terminal-game-io

import * as nodeProcess from 'process';
import * as nodeReadline from 'readline';

/*
isNode && isBrowser based on:
- https://stackoverflow.com/a/33697246
- https://github.com/foo123/asynchronous.js/blob/0.5.1/asynchronous.js#L40
- https://stackoverflow.com/a/48536881
*/
export const isNode = typeof global !== 'undefined' &&
  toString.call(global) === '[object global]';

export const isBrowser = !isNode &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof window !== 'undefined';

export const getElementById = (id: string): HTMLElement => {
  return isBrowser
    ? document.getElementById(id)
    : null;
};

export const argv: string[] = isNode
  ? nodeProcess.argv
  : [];

export const process: NodeJS.Process = isNode ? nodeProcess : null;

export type EmitKeypressEvents = (
  stream: NodeJS.ReadableStream,
  /*tslint:disable-next-line*/
  _interface?: nodeReadline.ReadLine
) => void;

export const emitKeypressEvents: EmitKeypressEvents = isNode ? nodeReadline.emitKeypressEvents : null;
