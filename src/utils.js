import strftime from 'strtime';

export const dateToIso = (year, month, day, isString = false) => {
  function pad(number) {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  }

  if (isString) {
    return `${year}-${pad(month + 1)}-${pad(day)}`;
  }
  return new Date(year, month, day + 1);
};

export const dateToArray = (date) => {
  const a = strftime.strftime(date, '%Y-%m-%d').split('-');

  return [
    parseInt(a[0]), // year
    parseInt(a[1] - 1), // month index
    parseInt(a[2]) // day
  ];
};

export const isLater = (start, end) => dateToIso(...start, true) < dateToIso(...end, true);

export const validationOfRange = (cell, index, range) => {
  if (index === range.length - 1) {
    return cell.getAttribute('data-available-out') !== '';
  }
  return cell.getAttribute('data-disabled') === '';
};

export const tFormatter = (value, str) => str.replace('%number', value);
