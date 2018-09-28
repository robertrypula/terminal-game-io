// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { IKeyNameMapBrowser, KeyName } from '../models/key-name.interface';

const isPrintableAscii = (keyName: string): boolean => {
  // skip tilde as this is not the key available via single press
  return keyName.length === 1 &&
    '!'.charCodeAt(0) <= keyName.charCodeAt(0) &&
    keyName.charCodeAt(0) <= '}'.charCodeAt(0);
};

const keyNameMap: IKeyNameMapBrowser[] = [
  // other ASCII
  { keyNameIn: ['Backspace'], keyNameOut: KeyName.Backspace },
  { keyNameIn: ['Tab'], keyNameOut: KeyName.Tab },
  { keyNameIn: ['Enter'], keyNameOut: KeyName.Enter },
  { keyNameIn: ['Escape', 'Esc'], keyNameOut: KeyName.Escape },
  { keyNameIn: ['Space', 'Spacebar', ' '], keyNameOut: KeyName.Space },
  { keyNameIn: ['Delete', 'Del'], keyNameOut: KeyName.Delete },
  // arrows
  { keyNameIn: ['ArrowUp', 'Up'], keyNameOut: KeyName.ArrowUp },
  { keyNameIn: ['ArrowDown', 'Down'], keyNameOut: KeyName.ArrowDown },
  { keyNameIn: ['ArrowRight', 'Right'], keyNameOut: KeyName.ArrowRight },
  { keyNameIn: ['ArrowLeft', 'Left'], keyNameOut: KeyName.ArrowLeft },
  // cursor position
  { keyNameIn: ['Home'], keyNameOut: KeyName.Home },
  { keyNameIn: ['Insert'], keyNameOut: KeyName.Insert },
  { keyNameIn: ['End'], keyNameOut: KeyName.End },
  { keyNameIn: ['PageUp'], keyNameOut: KeyName.PageUp },
  { keyNameIn: ['PageDown'], keyNameOut: KeyName.PageDown },
  // functional
  { keyNameIn: ['F1'], keyNameOut: KeyName.F1 },
  { keyNameIn: ['F2'], keyNameOut: KeyName.F2 },
  { keyNameIn: ['F3'], keyNameOut: KeyName.F3 },
  { keyNameIn: ['F4'], keyNameOut: KeyName.F4 },
  { keyNameIn: ['F5'], keyNameOut: KeyName.F5 },
  { keyNameIn: ['F6'], keyNameOut: KeyName.F6 },
  { keyNameIn: ['F7'], keyNameOut: KeyName.F7 },
  { keyNameIn: ['F8'], keyNameOut: KeyName.F8 },
  { keyNameIn: ['F9'], keyNameOut: KeyName.F9 },
  { keyNameIn: ['F10'], keyNameOut: KeyName.F10 },
  { keyNameIn: ['F11'], keyNameOut: KeyName.F11 },
  { keyNameIn: ['F12'], keyNameOut: KeyName.F12 },
  // purely IE mapping
  { keyNameIn: ['Add'], keyNameOut: '+' },
  { keyNameIn: ['Decimal'], keyNameOut: '.' },
  { keyNameIn: ['Divide'], keyNameOut: '/' },
  { keyNameIn: ['Multiply'], keyNameOut: '*' },
  { keyNameIn: ['Subtract'], keyNameOut: '-' }
];

export const getNormalizedKeyName = (e: KeyboardEvent): string => {
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

  return KeyName.UnknownKey;
};
