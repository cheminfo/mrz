'use strict';

var x = {
  format: 'td1',
  valid: true,
  fields: {
    birthDate: 551318400000
  },
  annotations: [
    {
      label: 'Birth date',
      start: 10,
      end: 19,
      line: 1,
      valid: true,
      field: 'birthDate',
      message: ''
    },
    {
      label: 'Birth date check digit',
      start: 19,
      end: 20,
      line: 1,
      valid: true,
      related: [
        {
          line: 1,
          start: 10,
          end: 19
        }
      ]
    }
  ]
};
