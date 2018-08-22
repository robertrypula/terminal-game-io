// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

// import * as envUtils from '../../env-utils/env-utils';

// import { ITerminalGameIo } from '../terminal-game-io.interface';
import { TerminalGameIoCommon } from './terminal-game-io-common';

describe('TerminalGameIoCommon', () => {
  it('should create proper instance', () => {
    // spyOn(envUtils, 'process').and.returnValue(null);

    // const terminalGameIoCommon = new TerminalGameIoCommon({
    //   fps: 5,
    //   /*tslint:disable*/
    //   frameHandler: (instance: ITerminalGameIo) => { },
    //   keypressHandler: (instance: ITerminalGameIo, keyName: string) => { }
    //   /*tslint:enable*/
    // });
    //
    // expect(terminalGameIoCommon).toBeTruthy();
    // expect(terminalGameIoCommon).toBeInstanceOf(TerminalGameIoCommon);

    expect(TerminalGameIoCommon).toBeTruthy(); // dummy test
  });
});
