// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { ITerminalGameIo, ITerminalGameIoOptions, process } from '..';
import { cursorPosition, getKeyName } from '../utilities/terminal';
import { AbstractTerminalGameIo } from './abstract-terminal-game-io';

export class TerminalGameIoNode extends AbstractTerminalGameIo implements ITerminalGameIo {
  public constructor(options: ITerminalGameIoOptions) {
    super(options);
  }

  protected finalCleanup(): void {
    process.stdin.removeAllListeners();
    process.exit();
  }

  protected clear(): void {
    this.write(cursorPosition(1, 1));
  }

  protected initializeEvents(): void {
    process.stdin.setRawMode(true);
    process.stdin.on('data', (buffer: Buffer) => {
      const keyName = getKeyName(buffer.toJSON().data);

      // TODO on ssh connections more than one key might be present in the data array - fix it

      this.keypressHandler(this, keyName);
    });
  }

  protected write(value: string): void {
    process.stdout.write(value);
  }
}
