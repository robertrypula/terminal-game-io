// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

const CSI = String.fromCharCode(27) + '[';

export const cursorPosition = (x: number, y: number) => `${CSI}${y};${y}H`;

const isSingleBytePrintableAscii = (data: number[]): boolean => {
  // skip tilde as this is not the key available via single press
  return data.length === 1 &&
    '!'.charCodeAt(0) <= data[0] &&
    data[0] <= '}'.charCodeAt(0);
};

const keyMap = [
  // other ASCII
  { data: [[8], [127]], keyName: 'Backspace' },   // ssh connection via putty generates 127 for Backspace - weird...
  { data: [[9]], keyName: 'Tab' },
  { data: [[13]], keyName: 'Enter' },
  { data: [[27]], keyName: 'Escape' },
  { data: [[32]], keyName: 'Space' },
  { data: [[27, 91, 51, 126]], keyName: 'Delete' },
  // arrows
  { data: [[27, 91, 65]], keyName: 'ArrowUp' },
  { data: [[27, 91, 66]], keyName: 'ArrowDown' },
  { data: [[27, 91, 67]], keyName: 'ArrowRight' },
  { data: [[27, 91, 68]], keyName: 'ArrowLeft' },
  // cursor position
  { data: [[27, 91, 49, 126]], keyName: 'Home' },
  { data: [[27, 91, 50, 126]], keyName: 'Insert' },
  { data: [[27, 91, 52, 126]], keyName: 'End' },
  { data: [[27, 91, 53, 126]], keyName: 'PageUp' },
  { data: [[27, 91, 54, 126]], keyName: 'PageDown' },
  // functional
  { data: [[27, 91, 91, 65], [27, 91, 49, 49, 126]], keyName: 'F1' },
  { data: [[27, 91, 91, 66], [27, 91, 49, 50, 126]], keyName: 'F2' },
  { data: [[27, 91, 91, 67], [27, 91, 49, 51, 126]], keyName: 'F3' },
  { data: [[27, 91, 91, 68], [27, 91, 49, 52, 126]], keyName: 'F4' },
  { data: [[27, 91, 91, 69], [27, 91, 49, 53, 126]], keyName: 'F5' },
  { data: [[27, 91, 49, 55, 126]], keyName: 'F6' },
  { data: [[27, 91, 49, 56, 126]], keyName: 'F7' },
  { data: [[27, 91, 49, 57, 126]], keyName: 'F8' },
  { data: [[27, 91, 50, 48, 126]], keyName: 'F9' },
  { data: [[27, 91, 50, 49, 126]], keyName: 'F10' },
  { data: [[27, 91, 50, 51, 126]], keyName: 'F11' },
  { data: [[27, 91, 50, 52, 126]], keyName: 'F12' }
];

export const getKeyName = (data: number[]): string => {
  let match;

  if (isSingleBytePrintableAscii(data)) {
    return String.fromCharCode(data[0]);
  }

  match = keyMap.filter((entry) => {
    const innerResult = entry.data.filter((subEntry) => subEntry.join(',') === data.join(','));

    return innerResult.length > 0;
  });

  if (match.length === 1) {
    return match[0].keyName;
  }

  // TODO remove me
  /*tslint:disable-next-line*/
  console.log(data.join(', ') + '                                 ');

  return '';
};
