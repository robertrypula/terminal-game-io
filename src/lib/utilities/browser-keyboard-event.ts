const isPrintableAscii = (keyName: string): boolean => {
  return keyName.length === 1 &&
    '!'.charCodeAt(0) <= keyName.charCodeAt(0) &&
    keyName.charCodeAt(0) <= '}'.charCodeAt(0);
};

const keyNameMap = [
  // other ASCII
  { keyNameIn: ['Backspace'], keyNameOut: 'Backspace' },
  { keyNameIn: ['Tab'], keyNameOut: 'Tab' },
  { keyNameIn: ['Enter'], keyNameOut: 'Enter' },
  { keyNameIn: ['Escape'], keyNameOut: 'Escape' },
  { keyNameIn: ['Space'], keyNameOut: 'Space' },
  // { keyNameIn: [126, 126], keyNameOut: '~' },   // remove tilde as this is not the key available via single press
  { keyNameIn: ['Delete'], keyNameOut: 'Delete' },
  // arrows
  { keyNameIn: ['ArrowUp'], keyNameOut: 'ArrowUp' },
  { keyNameIn: ['ArrowDown'], keyNameOut: 'ArrowDown' },
  { keyNameIn: ['ArrowRight'], keyNameOut: 'ArrowRight' },
  { keyNameIn: ['ArrowLeft'], keyNameOut: 'ArrowLeft' },
  // cursor position
  { keyNameIn: ['Home'], keyNameOut: 'Home' },
  { keyNameIn: ['Insert'], keyNameOut: 'Insert' },
  { keyNameIn: ['End'], keyNameOut: 'End' },
  { keyNameIn: ['PageUp'], keyNameOut: 'PageUp' },
  { keyNameIn: ['PageDown'], keyNameOut: 'PageDown' },
  // functional
  { keyNameIn: ['F1'], keyNameOut: 'F1' },
  { keyNameIn: ['F2'], keyNameOut: 'F2' },
  { keyNameIn: ['F3'], keyNameOut: 'F3' },
  { keyNameIn: ['F4'], keyNameOut: 'F4' },
  { keyNameIn: ['F5'], keyNameOut: 'F5' },
  { keyNameIn: ['F6'], keyNameOut: 'F6' },
  { keyNameIn: ['F7'], keyNameOut: 'F7' },
  { keyNameIn: ['F8'], keyNameOut: 'F8' },
  { keyNameIn: ['F9'], keyNameOut: 'F9' },
  { keyNameIn: ['F10'], keyNameOut: 'F10' },
  { keyNameIn: ['F11'], keyNameOut: 'F11' },
  { keyNameIn: ['F12'], keyNameOut: 'F12' }
];

export const getNormalizedKeyName = (e: KeyboardEvent): string => {
  let match;

  if (isPrintableAscii(e.key)) {
    return e.key;
  }

  match = keyNameMap.filter(
    (entry) => entry.keyNameIn.indexOf(e.key) >= 0
  );

  if (match.length === 1) {
    return match[0].keyNameOut;
  }

  return '';
};
