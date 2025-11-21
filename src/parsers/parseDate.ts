export default function parseDate(value: string) {
  if (!value.match(/^[0-9<]{4,6}$/)) {
    throw new Error(`invalid date: ${value}`);
  }

  const month = value.slice(2, 4);
  if (
    month !== '<<' &&
    (Number.parseInt(month, 10) < 1 || Number.parseInt(month, 10) > 12)
  ) {
    throw new Error(`invalid date month: ${month}`);
  }

  if (value.length === 6) {
    const day = value.slice(4, 6);
    if (
      day !== '<<' &&
      (Number.parseInt(day, 10) < 1 || Number.parseInt(day, 10) > 31)
    ) {
      throw new Error(`invalid date day: ${day}`);
    }
  }

  return value;
}
