import { check, computeCheckDigit } from './check.ts';

export default function parseDocumentNumberCheckDigit(
  checkDigit: string,
  source: string,
  optional: string,
) {
  if (checkDigit === '<' && optional) {
    const firstFiller = optional.indexOf('<');
    const tail = optional.slice(0, firstFiller - 1);
    // Handle older non-compliant documents (e.g., PRT and BEL IDs) where the check digit
    // is embedded in optional1 instead of following the document number directly.
    // According to ICAO Doc 9303 Part 11 (https://www.icao.int/sites/default/files/publications/DocSeries/9303_p11_cons_en.pdf)
    // page 88, the check digit should be calculated on the document number including
    // any additional characters from optional1 up to (but not including) the embedded check digit.
    const embeddedDigit = optional.charAt(firstFiller - 1);
    const embeddedValid =
      computeCheckDigit(`${source}${tail}`) === Number(embeddedDigit);
    if (embeddedValid) {
      return {
        value: embeddedDigit,
        start: firstFiller,
        end: firstFiller + 1,
      };
    }
    source = `${source}<${tail}`;
    checkDigit = embeddedDigit;
    check(source, checkDigit);
    return {
      value: checkDigit,
      start: firstFiller,
      end: firstFiller + 1,
    };
  } else {
    check(source, checkDigit);
    return checkDigit;
  }
}
