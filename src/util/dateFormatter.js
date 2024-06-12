import {formToJSON} from 'axios';

export const getDay = dateString => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error('Invalid date format');
  }

  const options = {day: 'numeric'};
  return date.toLocaleString('en-US', options);
};

export const getWeekDay = dateString => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error('Invalid date format');
  }

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
};

export const getMonth = dateString => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error('Invalid date format');
  }

  const options = {month: 'long'};
  return date.toLocaleString(undefined, options);
};

export const getYear = dateString => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error('Invalid date format');
  }

  const options = {year: 'numeric'};
  return date.toLocaleString(undefined, options);
};

export const getTime = dateString => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error('Invalid date format');
  }

  const options = {hour: 'numeric', minute: 'numeric'};
  return date.toLocaleString(undefined, options);
};

export const getDate = dateString => {
  const currentTime = new Date();
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error('Invalid date format');
  }

  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  };

  const formatter = new Intl.DateTimeFormat(undefined, options);
  const parts = formatter.formatToParts(date);

  const formattedDate = parts.reduce((acc, part) => {
    if (part.type === 'day') acc.day = part.value;
    if (part.type === 'month') acc.month = part.value;
    if (part.type === 'year') acc.year = part.value;
    if (part.type === 'weekday') acc.weekday = part.value;
    if (part.type === 'hour') acc.hour = part.value;
    if (part.type === 'minute') acc.minute = part.value;
    if (part.type === 'timeZoneName') acc.timeZoneName = part.value;
    return acc;
  }, {});

  return `${
    formattedDate.day
  } ${formattedDate.month.toUpperCase()}, ${formattedDate.weekday.toUpperCase()} ${
    formattedDate.hour
  }:${formattedDate.minute} ${formattedDate.timeZoneName}`;
};

export const getDifference = dateInString => {
  const currentDate = new Date();
  const date = new Date(dateInString);
  const differenceInMilliseconds = Math.abs(currentDate - date);

  const millisecondsInMinute = 60 * 1000;
  const millisecondsInHour = 60 * millisecondsInMinute;
  const millisecondsInDay = 24 * millisecondsInHour;
  const millisecondsInYear = 365 * millisecondsInDay; // Simplification, ignoring leap years

  let remainingMilliseconds = differenceInMilliseconds;

  const years = Math.floor(remainingMilliseconds / millisecondsInYear);
  remainingMilliseconds %= millisecondsInYear;

  const days = Math.floor(remainingMilliseconds / millisecondsInDay);
  remainingMilliseconds %= millisecondsInDay;

  const hours = Math.floor(remainingMilliseconds / millisecondsInHour);
  remainingMilliseconds %= millisecondsInHour;

  const minutes = Math.floor(remainingMilliseconds / millisecondsInMinute);

  let result = '';

  if (years > 0) {
    result += `${years} year${years > 1 ? 's' : ''}`;
  } else if (days > 0) {
    result += `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    result = 'less than a minute';
  }

  return result;
};
