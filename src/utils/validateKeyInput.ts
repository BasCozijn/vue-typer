export default function (key: string): boolean {
  const isLetter = /^[a-zA-Z]$/.test(key);
  const isBackspace = key === 'Backspace';
  const isSpace = key === ' ';

  return isLetter || isBackspace || isSpace;
}
