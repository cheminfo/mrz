import { describe, expect, it } from 'vitest';

import states from '../states.ts';

describe('check countries', () => {
  it('Number of countries', () => {
    const codes = Object.keys(states);
    for (const code of codes) {
      if (code !== 'D') {
        expect(code).toHaveLength(3);
      }
    }

    expect(codes).toHaveLength(277);
    expect(states.CHE).toBe('Switzerland');
    expect(states.DEU).toBe('Germany');
  });
});
