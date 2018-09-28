// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { IKeyNameMapNode, KeyName } from '../models/key-name.interface';

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
  { data: [[8], [127]], keyName: KeyName.Backspace }, // ssh connection via putty generates 127 for Backspace - weird...
  { data: [[9]], keyName: KeyName.Tab },
  { data: [[13]], keyName: KeyName.Enter },
  { data: [[27]], keyName: KeyName.Escape },
  { data: [[32]], keyName: KeyName.Space },
  { data: [[27, 91, 51, 126]], keyName: KeyName.Delete },
  // arrows
  { data: [[27, 91, 65]], keyName: KeyName.ArrowUp },
  { data: [[27, 91, 66]], keyName: KeyName.ArrowDown },
  { data: [[27, 91, 67]], keyName: KeyName.ArrowRight },
  { data: [[27, 91, 68]], keyName: KeyName.ArrowLeft },
  // cursor position
  { data: [[27, 91, 49, 126]], keyName: KeyName.Home },
  { data: [[27, 91, 50, 126]], keyName: KeyName.Insert },
  { data: [[27, 91, 52, 126]], keyName: KeyName.End },
  { data: [[27, 91, 53, 126]], keyName: KeyName.PageUp },
  { data: [[27, 91, 54, 126]], keyName: KeyName.PageDown },
  // functional
  { data: [[27, 91, 91, 65], [27, 91, 49, 49, 126]], keyName: KeyName.F1 },
  { data: [[27, 91, 91, 66], [27, 91, 49, 50, 126]], keyName: KeyName.F2 },
  { data: [[27, 91, 91, 67], [27, 91, 49, 51, 126]], keyName: KeyName.F3 },
  { data: [[27, 91, 91, 68], [27, 91, 49, 52, 126]], keyName: KeyName.F4 },
  { data: [[27, 91, 91, 69], [27, 91, 49, 53, 126]], keyName: KeyName.F5 },
  { data: [[27, 91, 49, 55, 126]], keyName: KeyName.F6 },
  { data: [[27, 91, 49, 56, 126]], keyName: KeyName.F7 },
  { data: [[27, 91, 49, 57, 126]], keyName: KeyName.F8 },
  { data: [[27, 91, 50, 48, 126]], keyName: KeyName.F9 },
  { data: [[27, 91, 50, 49, 126]], keyName: KeyName.F10 },
  { data: [[27, 91, 50, 51, 126]], keyName: KeyName.F11 },
  { data: [[27, 91, 50, 52, 126]], keyName: KeyName.F12 }
];

export const getKeyName = (data: number[]): string => {
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

  return KeyName.UnknownKey;
};
