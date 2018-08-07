// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula/terminal-game-io

import { ITerminalGameIo } from '../terminal-game-io.interface';
import { TerminalGameIoCommon } from './terminal-game-io-common';

describe('TerminalGameIoCommon', () => {
  it('should create proper instance', () => {
    const terminalGameIoCommon = new TerminalGameIoCommon({
      fps: 5,
      /*tslint:disable*/
      frameHandler: (instance: ITerminalGameIo) => { },
      keypressHandler: (instance: ITerminalGameIo, keyName: string) => { }
      /*tslint:enable*/
    });

    expect(terminalGameIoCommon).toBeTruthy();
    expect(terminalGameIoCommon).toBeInstanceOf(TerminalGameIoCommon);
  });
});
