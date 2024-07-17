export function timeToString(milliseconds: number) {
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const hours = Math.floor(minutes / 60);
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (hours > 0) {
    return `${hours}:${minutesString}:${secondsString}`;
  }

  return `${minutesString}:${secondsString}`;
}
