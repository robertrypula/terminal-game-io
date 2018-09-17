// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

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

declare var document: Document;

export const getElementById = (id: string): HTMLElement => {
  return isBrowser
    ? document.getElementById(id)
    : null;
};

export const argv: string[] = isNode ? global.process.argv : [];

export const process: NodeJS.Process = isNode ? global.process : null;

// let nodeEmitKeypressEvents: any;
//
// if (isNode) {
//   try {
//     nodeEmitKeypressEvents = require('readline').emitKeypressEvents;
//   } catch (e) {
//     nodeEmitKeypressEvents = null;
//   }
// }

/*
export type EmitKeypressEvents = (
  stream: NodeJS.ReadableStream
) => void;
*/

// Based on: https://github.com/nodejs/node/blob/master/lib/readline.js
/*
const emitKeypressEventsLocal = (stream: NodeJS.ReadableStream): void => {
  function onData(b: Buffer) {

    if (stream.listenerCount('keypress') > 0) {

    } else {
      // Nobody's watching anyway
      stream.removeListener('data', onData);
      stream.on('newListener', onNewListener);
    }
  }

  function onNewListener(event: string) {
    console.log('onNewListener', event);
    if (event === 'keypress') {
      stream.on('data', onData);
      stream.removeListener('newListener', onNewListener);
    }
  }

  if (stream.listenerCount('keypress') > 0) {
    stream.on('data', onData);
  } else {
    stream.on('newListener', onNewListener);
  }
};

export const emitKeypressEvents: EmitKeypressEvents = isNode ? emitKeypressEventsLocal : null;
*/
