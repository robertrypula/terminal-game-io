const isPrintableAscii = (keyName: string): boolean => {
  return keyName.length === 1 &&
    '!'.charCodeAt(0) <= keyName.charCodeAt(0) &&
    keyName.charCodeAt(0) <= '}'.charCodeAt(0);
};

const keyNameMap = [
  { keyNameIn: ['left'], kayNameOut: 'ArrowLeft' }
];

export const getNormalizedKeyName = (e: KeyboardEvent): string => {
  if (isPrintableAscii(e.key)) {
    return e.key;
  }

  // TODO map only specific keys
  // console.log(e);

  return e.key;
};
