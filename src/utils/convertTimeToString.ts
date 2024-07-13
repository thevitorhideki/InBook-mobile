export function convertTimeToString(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes} minutos`;
  }
  if (remainingMinutes === 0) {
    return `${hours} horas`;
  }
  return `${hours} horas e ${remainingMinutes} minutos`;
}
