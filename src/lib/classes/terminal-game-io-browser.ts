// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { getElementById, ITerminalGameIo, ITerminalGameIoOptions } from '..';
import { AbstractTerminalGameIo } from './abstract-terminal-game-io';

export class TerminalGameIoBrowser extends AbstractTerminalGameIo implements ITerminalGameIo {
  protected domElementId: string;

  public constructor(options: ITerminalGameIoOptions) {
    super(options);
    this.domElementId = options.domElementId ? options.domElementId : 'root';
  }

  public write(value: string): void {
    const domElement: HTMLElement = getElementById(this.domElementId);

    if (domElement) {
      domElement.innerHTML = domElement.innerHTML + value;
    }
  }

  protected cleanupBeforeExit(): void {
    document.removeEventListener('keydown', this.keydownEventListener);
  }

  protected clear(): void {
    const domElement: HTMLElement = getElementById(this.domElementId);

    if (domElement) {
      domElement.innerHTML = '';
    }
  }

  protected initializeEvents(): void {
    document.addEventListener('keydown', this.keydownEventListener);
  }

  protected keydownEventListener = (e: KeyboardEvent): void => {
    this.keypressHandler(this, e.key);
  }
}
