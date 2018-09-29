// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { IKeyNameMapBrowser, Key, KeyName } from '../models/key-name.interface';

const isPrintableAscii = (keyName: string): boolean => {
  // skip tilde as this is not the key available via single press
  return keyName.length === 1 &&
    '!'.charCodeAt(0) <= keyName.charCodeAt(0) &&
    keyName.charCodeAt(0) <= '}'.charCodeAt(0);
};

const keyNameMap: IKeyNameMapBrowser[] = [
  // other ASCII
  { keyNameIn: ['Backspace'], keyNameOut: Key.Backspace },
  { keyNameIn: ['Tab'], keyNameOut: Key.Tab },
  { keyNameIn: ['Enter'], keyNameOut: Key.Enter },
  { keyNameIn: ['Escape', 'Esc'], keyNameOut: Key.Escape },
  { keyNameIn: ['Space', 'Spacebar', ' '], keyNameOut: Key.Space },
  { keyNameIn: ['Delete', 'Del'], keyNameOut: Key.Delete },
  // arrows
  { keyNameIn: ['ArrowUp', 'Up'], keyNameOut: Key.ArrowUp },
  { keyNameIn: ['ArrowDown', 'Down'], keyNameOut: Key.ArrowDown },
  { keyNameIn: ['ArrowRight', 'Right'], keyNameOut: Key.ArrowRight },
  { keyNameIn: ['ArrowLeft', 'Left'], keyNameOut: Key.ArrowLeft },
  // cursor position
  { keyNameIn: ['Home'], keyNameOut: Key.Home },
  { keyNameIn: ['Insert'], keyNameOut: Key.Insert },
  { keyNameIn: ['End'], keyNameOut: Key.End },
  { keyNameIn: ['PageUp'], keyNameOut: Key.PageUp },
  { keyNameIn: ['PageDown'], keyNameOut: Key.PageDown },
  // functional
  { keyNameIn: ['F1'], keyNameOut: Key.F1 },
  { keyNameIn: ['F2'], keyNameOut: Key.F2 },
  { keyNameIn: ['F3'], keyNameOut: Key.F3 },
  { keyNameIn: ['F4'], keyNameOut: Key.F4 },
  { keyNameIn: ['F5'], keyNameOut: Key.F5 },
  { keyNameIn: ['F6'], keyNameOut: Key.F6 },
  { keyNameIn: ['F7'], keyNameOut: Key.F7 },
  { keyNameIn: ['F8'], keyNameOut: Key.F8 },
  { keyNameIn: ['F9'], keyNameOut: Key.F9 },
  { keyNameIn: ['F10'], keyNameOut: Key.F10 },
  { keyNameIn: ['F11'], keyNameOut: Key.F11 },
  { keyNameIn: ['F12'], keyNameOut: Key.F12 },
  // purely IE mapping
  { keyNameIn: ['Add'], keyNameOut: '+' },
  { keyNameIn: ['Decimal'], keyNameOut: '.' },
  { keyNameIn: ['Divide'], keyNameOut: '/' },
  { keyNameIn: ['Multiply'], keyNameOut: '*' },
  { keyNameIn: ['Subtract'], keyNameOut: '-' }
];

export const getNormalizedKeyName = (e: KeyboardEvent): KeyName => {
  let match: IKeyNameMapBrowser[];

  if (isPrintableAscii(e.key)) {
    return e.key;
  }

  match = keyNameMap.filter(
    (entry) => entry.keyNameIn.indexOf(e.key) >= 0
  );

  if (match.length === 1) {
    return match[0].keyNameOut;
  }

  return Key.Unknown;
};
