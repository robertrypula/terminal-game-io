// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

export enum KeyName {
  UnknownKey = '',

  // other Ascii
  Backspace = 'Backspace',
  Tab = 'Tab',
  Enter = 'Enter',
  Escape = 'Escape',
  Space = 'Space',
  Delete = 'Delete',

  // arrows
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',

  // cursor position
  Home = 'Home',
  Insert = 'Insert',
  End = 'End',
  PageUp = 'PageUp',
  PageDown = 'PageDown',

  // functional
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12'
}

export interface IKeyNameMapBrowser {
  keyNameIn: string[];
  keyNameOut: KeyName | string;
}

export interface IKeyNameMapNode {
  data: number[][];
  keyName: KeyName | string;
}
