const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OKT',
  'NOV',
  'DEC',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// eslint-disable-next-line import/prefer-default-export
export const getReadableDate = (date: Date, withDay: boolean = false) =>
  `${withDay ? `${days[date.getDay()]}, ` : ''}${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
