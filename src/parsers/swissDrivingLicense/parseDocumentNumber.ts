import parseLanguageCode from './parseLanguageCode';

export default function parseDocumentNumber(source: string) {
  // swiss driving license number
  const first = source.substring(0, 3);
  const second = source.substring(3, 6);
  const languageCode = source.charAt(6);
  const end = source.substring(7);

  if (!first.match(/^[A-Z0-9]{3}$/)) {
    throw new Error(
      `invalid document number: ${source}. Must start with three alphanumeric digits`,
    );
  }
  if (!second.match(/^[0-9]{3}$/)) {
    throw new Error(
      `invalid document number: ${source}. Must have numeric digits in positions 4, 5 and 6`,
    );
  }
  if (end !== '<<') {
    throw new Error(`invalid document number: ${source}. Must end with <<`);
  }

  // calling this method to throw if languageCode invalid
  parseLanguageCode(languageCode);
  return {
    value: source.substring(0, 7),
    start: 0,
    end: 7,
  };
}
