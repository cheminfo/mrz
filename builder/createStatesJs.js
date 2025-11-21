import fs from 'node:fs';

function readIsoStates() {
  const states = fs
    .readFileSync(`${import.meta.dirname}/states-iso3166.tsv`, 'utf8')
    .split('\n')
    .filter(
      (c) =>
        c !== '' && !c.startsWith('#') && !c.startsWith('English short name'),
    );

  const statesObject = {};
  for (let state of states) {
    const split = state.split('\t');
    statesObject[split[3]] = split[0];
  }

  return statesObject;
}

function readAdditionalStates() {
  const states = fs
    .readFileSync(`${import.meta.dirname}/states.txt`, 'utf8')
    .split('\n')
    .filter((c) => c !== '' && !c.startsWith('#'));

  const statesObject = {};
  for (let state of states) {
    const split = state.split(' ');
    statesObject[split.at(-1)] = split.slice(0, -2).join(' ');
  }

  return statesObject;
}

const statesObject = {
  ...readIsoStates(),
  ...readAdditionalStates(),
};

const result = [
  `const states: Record<string, string> = ${JSON.stringify(statesObject, null, 2)};`,
  'Object.freeze(states);',
  'export default states;',
  '',
];

fs.writeFileSync(
  `${import.meta.dirname}/../src/generated/states.ts`,
  result.join('\n'),
);
