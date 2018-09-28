// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

export enum KeyName {
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  Space = 'Space',
  Escape = 'Escape'
}

export interface IKeyNameMapBrowser {
  keyNameIn: string[],
  keyNameOut: string;
}
