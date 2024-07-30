/**
 * D1 seems to be the most common,
 * but with Google image search we can find some B1, A1, A2
 */
const knownPrefixCode = ['A', 'B', 'D'];

export default function parseDocumentCode(source: string) {
  if (source.length !== 2) {
    throw new Error(`invalid document code: ${source}. must be 2 char length`);
  }

  const first = source[0];
  const second = source[1];

  validateFirstChar(first, source);
  validateSecondChar(second, source);

  return `${first}${second}`;
}

function validateFirstChar(char: string, source: string) {
  if (!knownPrefixCode.includes(char)) {
    throw new Error(
      `invalid document code: ${source}. First character must be ???`,
    );
  }
}

function validateSecondChar(char: string, source: string) {
  const num = parseInt(char, 10);

  if (Number.isNaN(num)) {
    throw new Error(
      `invalid document code number: ${source}. Second character must be a number`,
    );
  }
}
