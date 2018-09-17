// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import * as fromEnvUtils from '../../env-utils/env-utils';
import { TerminalGameIoCommon } from '../terminal-game-io-common/terminal-game-io-common';
import { ITerminalGameIo, ITerminalGameIoOptions } from '../terminal-game-io.interface';

export class TerminalGameIoBrowser extends TerminalGameIoCommon implements ITerminalGameIo {
  protected domElementId: string;

  public constructor(options: ITerminalGameIoOptions) {
    super(options);
    this.domElementId = options.domElementId ? options.domElementId : 'root';
  }

  public exit(): void {
    clearInterval(this.intervalId);
    document.removeEventListener('keydown', this.keydownEventListener);
    this.active = false;
  }

  public write(value: string): void {
    const domElement: HTMLElement = fromEnvUtils.getElementById(this.domElementId);

    if (domElement) {
      domElement.innerHTML = domElement.innerHTML + value;
    }
  }

  protected clear(): void {
    const domElement: HTMLElement = fromEnvUtils.getElementById(this.domElementId);

    if (domElement) {
      domElement.innerHTML = '';
    }
  }

  protected initialize(): void {
    document.addEventListener('keydown', this.keydownEventListener);
    this.intervalId = setInterval(
      () => this.frameHandler(this),
      this.frameDuration
    );
    this.active = true;
  }
}
