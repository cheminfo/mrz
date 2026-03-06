export function computeCheckDigit(string: string) {
  let code = 0;
  const factors = [7, 3, 1];
  for (let i = 0; i < string.length; i++) {
    // eslint-disable-next-line unicorn/prefer-code-point
    let charCode = string.charCodeAt(i);
    if (charCode === 60) charCode = 0;
    if (charCode >= 65) charCode -= 55;
    if (charCode >= 48) charCode -= 48;
    charCode *= factors[i % 3];
    code += charCode;
  }
  return code % 10;
}

export function check(string: string, value: string | number) {
  const code = computeCheckDigit(string);
  if (code !== Number(value)) {
    throw new Error(`invalid check digit: ${value}. Must be ${code}`);
  }
}
