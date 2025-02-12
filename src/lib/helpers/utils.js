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
    locale: 'en',
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

/**
 * Generate foreground and background colors from a string
 * @param {string} str - Input string
 * @param {number} [brightnessAdjustment=0] - Amount to adjust the brightness (positive for brighter, negative for darker)
 * @returns {Object} - Object containing foreground and background colors
 */
export function stringToHexColors(str, brightnessAdjustment = 0) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let backgroundColor = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    value = Math.min(Math.max(value + brightnessAdjustment, 0), 255); // Adjust brightness
    backgroundColor += ('00' + value.toString(16)).slice(-2);
  }

  // Calculate the foreground color (black or white) based on the background color brightness
  const r = parseInt(backgroundColor.slice(1, 3), 16);
  const g = parseInt(backgroundColor.slice(3, 5), 16);
  const b = parseInt(backgroundColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const foregroundColor = brightness > 128 ? '#000000' : '#FFFFFF';

  return { foregroundColor, backgroundColor };
}

/**
 * Adjust the brightness of a color
 * @param {string} color - Input color in RGB or hex format
 * @param {number} brightnessAdjustment - Amount to adjust the brightness (positive for brighter, negative for darker)
 * @returns {string} - Modified color in hex format
 */
export function adjustColorBrightness(color, brightnessAdjustment) {
  let r, g, b;

  if (color.startsWith('#')) {
    // Hex color
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else if (color.startsWith('rgb')) {
    // RGB color
    const rgbValues = color.match(/\d+/g);
    r = parseInt(rgbValues[0], 10);
    g = parseInt(rgbValues[1], 10);
    b = parseInt(rgbValues[2], 10);
  } else {
    throw new Error('Invalid color format');
  }

  r = Math.min(Math.max(r + brightnessAdjustment, 0), 255);
  g = Math.min(Math.max(g + brightnessAdjustment, 0), 255);
  b = Math.min(Math.max(b + brightnessAdjustment, 0), 255);

  return `#${('00' + r.toString(16)).slice(-2)}${('00' + g.toString(16)).slice(-2)}${('00' + b.toString(16)).slice(-2)}`;
}
