// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula/terminal-game-io

import { TerminalGameIo } from './terminal-game-io';

describe('TerminalGameIo', () => {
  it('should create proper instance', () => {
    const instance = new TerminalGameIo(
      /*tslint:disable*/
      (time: number, keyName: string) => { },
      (time: number) => { },
      /*tslint:enable*/
      5
    );

    expect(instance).toBeTruthy();
    expect(instance).toBeInstanceOf(TerminalGameIo);
  });
});
