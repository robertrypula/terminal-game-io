// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

const CSI = String.fromCharCode(27) + '[';

export const cursorPosition = (x: number, y: number) => `${CSI}${y};${y}H`;

const isSingleBytePrintableAscii = (data: number[]): boolean => {
  return data.length === 1 &&
    '!'.charCodeAt(0) <= data[0] &&
    data[0] <= '}'.charCodeAt(0);
};

const keyMap = [
  // other ASCII
  { data: [8], keyName: 'backspace' },
  { data: [9], keyName: 'tab' },
  { data: [13], keyName: 'enter' },
  { data: [27], keyName: 'escape' },
  { data: [32], keyName: 'space' },
  { data: [126, 126], keyName: '~' },
  { data: [27, 91, 51, 126], keyName: 'delete' },
  // arrows
  { data: [27, 91, 65], keyName: 'up' },
  { data: [27, 91, 66], keyName: 'down' },
  { data: [27, 91, 67], keyName: 'right' },
  { data: [27, 91, 68], keyName: 'left' },
  // cursor position
  { data: [1234], keyName: 'pageUp' },    // TODO add
  { data: [1234], keyName: 'pageDown' },  // TODO add
  { data: [1234], keyName: 'home' },      // TODO add
  { data: [1234], keyName: 'end' },       // TODO add
  // functional
  { data: [1234], keyName: 'f1' },    // TODO add
  { data: [1234], keyName: 'f2' }     // TODO add
];

export const getKeyName = (data: number[]): string => {
  let keyName = '';
  let match;

  /*console.log(data);*/

  if (isSingleBytePrintableAscii(data)) {
    return String.fromCharCode(data[0]);
  }

  match = keyMap.filter((entry) => entry.data.join(',') === data.join(','));

  if (match.length === 1) {
    keyName = match[0].keyName;
  }

  return keyName;
};
