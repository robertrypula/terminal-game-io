export interface ITerminalGameIo {
  drawFrame(frameData: string, width: number, height: number): void;
  exit(): void;
  getTime(): number;
  write(value: string): void;
}
