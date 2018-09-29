// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { getElementById, ITerminalGameIo, ITerminalGameIoOptions, KeyName } from '..';
import { getNormalizedKeyName } from '../utilities/browser-keyboard-event';
import { AbstractTerminalGameIo } from './abstract-terminal-game-io';

export class TerminalGameIoBrowser extends AbstractTerminalGameIo implements ITerminalGameIo {
  protected domElementId: string;
  protected keydownEventListener: (e: KeyboardEvent) => void;

  public constructor(options: ITerminalGameIoOptions) {
    super(options);
    this.domElementId = options.domElementId ? options.domElementId : 'root';
  }

  protected finalCleanup(): void {
    document.removeEventListener('keydown', this.keydownEventListener);
  }

  protected clear(): void {
    const domElement: HTMLElement = getElementById(this.domElementId);

    if (domElement) {
      domElement.innerHTML = '';
    }
  }

  protected initializeEvents(): void {
    this.keydownEventListener = (e: KeyboardEvent): void => {
      const keyName: KeyName = getNormalizedKeyName(e);

      this.keypressHandler(this, keyName);
      // e.preventDefault();    // TODO think about it
    };

    document.addEventListener('keydown', this.keydownEventListener);
  }

  protected write(value: string): void {
    const domElement: HTMLElement = getElementById(this.domElementId);

    if (domElement) {
      domElement.innerHTML = domElement.innerHTML + value;
    }
  }
}
