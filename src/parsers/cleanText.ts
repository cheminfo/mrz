export function cleanText(string: string) {
  return string.replaceAll(/<+$/g, '').replaceAll('<', ' ');
}
