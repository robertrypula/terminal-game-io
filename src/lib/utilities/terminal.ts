// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { IKeyNameMapNode, Key, KeyName } from '../models/key-name.interface';

const CSI = String.fromCharCode(27) + '[';

export const cursorPosition = (x: number, y: number) => `${CSI}${y + 1};${y + 1}H`;

const isSingleBytePrintableAscii = (data: number[]): boolean => {
  // skip tilde as this is not the key available via single press
  return data.length === 1 &&
    '!'.charCodeAt(0) <= data[0] &&
    data[0] <= '}'.charCodeAt(0);
};

const keyMap: IKeyNameMapNode[] = [
  // other ASCII
  { data: [[8], [127]], keyName: Key.Backspace }, // ssh connection via putty generates 127 for Backspace - weird...
  { data: [[9]], keyName: Key.Tab },
  { data: [[13]], keyName: Key.Enter },
  { data: [[27]], keyName: Key.Escape },
  { data: [[32]], keyName: Key.Space },
  { data: [[27, 91, 51, 126]], keyName: Key.Delete },
  // arrows
  { data: [[27, 91, 65]], keyName: Key.ArrowUp },
  { data: [[27, 91, 66]], keyName: Key.ArrowDown },
  { data: [[27, 91, 67]], keyName: Key.ArrowRight },
  { data: [[27, 91, 68]], keyName: Key.ArrowLeft },
  // cursor position
  { data: [[27, 91, 49, 126]], keyName: Key.Home },
  { data: [[27, 91, 50, 126]], keyName: Key.Insert },
  { data: [[27, 91, 52, 126]], keyName: Key.End },
  { data: [[27, 91, 53, 126]], keyName: Key.PageUp },
  { data: [[27, 91, 54, 126]], keyName: Key.PageDown },
  // functional
  { data: [[27, 91, 91, 65], [27, 91, 49, 49, 126]], keyName: Key.F1 },
  { data: [[27, 91, 91, 66], [27, 91, 49, 50, 126]], keyName: Key.F2 },
  { data: [[27, 91, 91, 67], [27, 91, 49, 51, 126]], keyName: Key.F3 },
  { data: [[27, 91, 91, 68], [27, 91, 49, 52, 126]], keyName: Key.F4 },
  { data: [[27, 91, 91, 69], [27, 91, 49, 53, 126]], keyName: Key.F5 },
  { data: [[27, 91, 49, 55, 126]], keyName: Key.F6 },
  { data: [[27, 91, 49, 56, 126]], keyName: Key.F7 },
  { data: [[27, 91, 49, 57, 126]], keyName: Key.F8 },
  { data: [[27, 91, 50, 48, 126]], keyName: Key.F9 },
  { data: [[27, 91, 50, 49, 126]], keyName: Key.F10 },
  { data: [[27, 91, 50, 51, 126]], keyName: Key.F11 },
  { data: [[27, 91, 50, 52, 126]], keyName: Key.F12 }
];

export const getKeyName = (data: number[]): KeyName => {
  let match: IKeyNameMapNode[];

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

  return Key.Unknown;
};
