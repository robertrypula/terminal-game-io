import { FrameHandler, KeypressHandler, TerminalGameIo } from "./terminal-game-io";
import { ITerminalGameIo } from "./terminal-game-io.interface";

export type TerminalGameIoFactory = (
  keypressHandler: KeypressHandler,
  frameHandler: FrameHandler,
  fps: number
) => ITerminalGameIo;

export const createTerminalGameIo: TerminalGameIoFactory = (
  keypressHandler: KeypressHandler,
  frameHandler: FrameHandler,
  fps: number
) => {
  return new TerminalGameIo(
    keypressHandler,
    frameHandler,
    fps
  );
};
