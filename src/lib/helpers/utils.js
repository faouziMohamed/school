import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import slugify from 'slugify';

export const emailRegex =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{6,30}$/; // at least 6 characters, at least one lowercase letter, at least one uppercase letter, at least one digit
export const phoneRegex = /^\d{1,15}$/;
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const capitalizeWords = (str) =>
  str.split(' ').map(capitalize).join(' ');

export function genSequence(initialValue = 0) {
  let value = initialValue;
  // eslint-disable-next-line no-plusplus
  return () => value++;
}

/**
 * Format date to human-readable format (e.g., 2 days ago)
 * @param {Date | string} date - Date string
 */
export function formatDateRelative(date) {
  dayjs.extend(relativeTime);
  return dayjs().to(dayjs(date));
}

export function generateSlug(title) {
  return slugify(title, {
    lower: true,
    locale: 'fr',
  });
}

export function getPasswordScore(password) {
  if (!password) {
    return 0;
  }

  const lower = /[a-z]/.test(password);
  const upper = /[A-Z]/.test(password);
  const digit = /\d/.test(password);
  const special = /[!@#$%^&*]/.test(password);
  const minSize = password.length >= 6;
  const criteria = [
    lower || upper || digit || special,
    lower && upper && digit,
    lower && upper && digit && minSize,
    password.length >= 8,
    passwordRegex.test(password) && special,
  ];

  const score = criteria.filter(Boolean).length;
  let message = '';
  // we need to know the missing criteria to display the message to the user
  if (score < 5) {
    const missing = [
      !lower && '1 lowercase letter',
      !upper && '1 uppercase letter',
      !digit && '1 number',
    ].filter(Boolean);
    if (missing.length === 0 && !minSize) {
      message = 'The password must contain at least 6 characters';
    } else if (missing.length <= 3 && !minSize) {
      message = `The password is missing ${missing.join(', ')} and must contain at least 6 characters`;
    } else {
      message = `The password is missing ${missing.join(', ')}`;
    }
  }

  return { score, message };
}
