'use strict';

const fs = require('fs');

function readIsoStates() {
  const states = fs
    .readFileSync(`${__dirname}/states-iso3166.tsv`, 'utf8')
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
    .readFileSync(`${__dirname}/states.txt`, 'utf8')
    .split('\n')
    .filter((c) => c !== '' && !c.startsWith('#'));

  const statesObject = {};
  for (let state of states) {
    const split = state.split(' ');
    statesObject[split[split.length - 1]] = split
      .slice(0, split.length - 2)
      .join(' ');
  }

  return statesObject;
}

const statesObject = {
  ...readIsoStates(),
  ...readAdditionalStates(),
};

const result = [];
result.push(`const states = ${JSON.stringify(statesObject, null, 2)};`);
result.push('Object.freeze(states);');
result.push('export default states;');
result.push('');

fs.writeFileSync(`${__dirname}/../src/generated/states.ts`, result.join('\n'));
