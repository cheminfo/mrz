import { check, computeCheckDigit } from './check.ts';

export default function parseDocumentNumberCheckDigit(
  checkDigit: string,
  source: string,
  optional: string,
) {
  if (checkDigit === '<' && optional) {
    const firstFiller = optional.indexOf('<');
    const tail = optional.slice(0, firstFiller - 1);
    // When the check digit slot has a '<', the check digit is the last character of the optional field.
    const embeddedDigit = optional.charAt(firstFiller - 1);
    const result = {
      value: embeddedDigit,
      start: firstFiller,
      end: firstFiller + 1,
    };

    // Handle different ways to compute the check digit.
    // For some documents, we must include the '<' character at position 14, and for some other not
    // The specificiation is unclear about which one should be used.
    // See ICAO Doc 9303 Part 11 (https://www.icao.int/sites/default/files/publications/DocSeries/9303_p11_cons_en.pdf)
    // Page 88 has an example, but it yields the same check digit with or without the '<' character.
    const isValid =
      computeCheckDigit(`${source}<${tail}`) === Number(embeddedDigit);
    if (isValid) {
      return result;
    }
    check(`${source}${tail}`, embeddedDigit);
    return result;
  } else {
    check(source, checkDigit);
    return checkDigit;
  }
}
