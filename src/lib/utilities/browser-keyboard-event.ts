const isPrintableAscii = (keyName: string): boolean => {
  // skip tilde as this is not the key available via single press
  return keyName.length === 1 &&
    '!'.charCodeAt(0) <= keyName.charCodeAt(0) &&
    keyName.charCodeAt(0) <= '}'.charCodeAt(0);
};

const keyNameMap = [
  // other ASCII
  { keyNameIn: ['Backspace'], keyNameOut: 'Backspace' },
  { keyNameIn: ['Tab'], keyNameOut: 'Tab' },
  { keyNameIn: ['Enter'], keyNameOut: 'Enter' },
  { keyNameIn: ['Escape', 'Esc'], keyNameOut: 'Escape' },
  { keyNameIn: ['Space', 'Spacebar', ' '], keyNameOut: 'Space' },
  { keyNameIn: ['Delete', 'Del'], keyNameOut: 'Delete' },
  // arrows
  { keyNameIn: ['ArrowUp', 'Up'], keyNameOut: 'ArrowUp' },
  { keyNameIn: ['ArrowDown', 'Down'], keyNameOut: 'ArrowDown' },
  { keyNameIn: ['ArrowRight', 'Right'], keyNameOut: 'ArrowRight' },
  { keyNameIn: ['ArrowLeft', 'Left'], keyNameOut: 'ArrowLeft' },
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
  { keyNameIn: ['F12'], keyNameOut: 'F12' },
  // purely IE mapping
  { keyNameIn: ['Add'], keyNameOut: '+' },
  { keyNameIn: ['Decimal'], keyNameOut: '.' },
  { keyNameIn: ['Divide'], keyNameOut: '/' },
  { keyNameIn: ['Multiply'], keyNameOut: '*' },
  { keyNameIn: ['Subtract'], keyNameOut: '-' }
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

  // TODO remove me
  document.getElementById('ie-test').innerHTML = document.getElementById('ie-test').innerHTML + e.key + ', ';

  return '';
};
